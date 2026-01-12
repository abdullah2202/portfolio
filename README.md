# DevOps Engineer Portfolio — AWS + Terraform + CI/CD

This portfolio website is built as a **real DevOps project** to demonstrate production-style cloud infrastructure, branching strategy, and automated deployments using GitHub Actions and Terraform.

## Live Environments

| Environment | URL |
|------------|-----|
| **Staging (dev)** | `https://dev.mabdullah.dev` |
| **Production (main)** | `https://mabdullah.dev` |

---

## Git Branching Strategy

This project follows a practical, team-friendly workflow:

1. All work starts from the latest `dev` branch
   ```bash
   git checkout dev
   git pull --rebase origin dev
   ```
2. New changes are developed on a dedicated feature branch:
` feature/* -> dev -> main `
3. Pull Requests are opened from `feature/*` into `dev`:
   - CI checks run
   - Code is reviewed
   - Merged to staging
4. Once staging is validated, promotion happens via PR:
`dev -> main`
5. A merge to `main` triggers production deployment by syncing the S3 bucket and invalidating the CloudFront
   ```yaml
    - name: Deploy Static Site to S3
          run: aws s3 sync website/ s3://<S3_BUCKET> --delete

    - name: Invalidate CloudFront Cache
      run: |
        aws cloudfront create-invalidation \
          --distribution-id <CLOUDFRONT_DIST_ID> \
          --paths "/*"
   ```

---

## CI/CD Pipeline — GitHub Actions

### CI Checks (`ci.yml`)
Triggered on Pull Requests to `dev` and `main`

```bash
# Terraform format check
terraform fmt -check -recursive

# Terraform module validation
terraform validate
```



### Deploy to Staging (`deploy-dev.yml`)

1. Triggered on push to dev branch. This workflow syncs the local website files to the dev S3 bucket. 

    ```yaml
    - name: Deploy Static Site to S3
            run: aws s3 sync website/ s3://<BUCKET_NAME> --delete
    ```
2. It then invalidates the CloudFront distribution so that changes are visible immediately on [dev.mabdullah.dev](https://dev.mabdullah.dev):

    ```yaml
    aws cloudfront create-invalidation \
      --distribution-id <CLOUDFRONT_DIST_ID> \
      --paths "/*"

    ```



### Deploy to Production (`deploy-prod.yml`)

1. Triggered on push to main branch via PR. This workflow syncs the local website files to the main s3 bucket. 

    ```yaml
    - name: Deploy Static Site to S3
            run: aws s3 sync website/ s3://<BUCKET_NAME> --delete
    ```

2. It then invalidates the CloudFront distribution so that changes are visible immediately on [mabdullah.dev](https://mabdullah.dev):

    ```yaml
    aws cloudfront create-invalidation \
      --distribution-id <CLOUDFRONT_DIST_ID> \
      --paths "/*"

    ```



## Terraform — Infrastructure as Code (IaC)

Terraform is used to provision and manage the entire AWS infrastructure for this portfolio site. This repo uses **small, reusable Terraform modules** so the setup is clean and easy to extend.

---

### Why Terraform?

Terraform provides:
- **Version-controlled infrastructure** (changes are reviewed via PRs)
- **Consistency** across staging and production
- **Reproducibility** (anyone can recreate the stack)
- A strong DevOps portfolio signal (IaC + automation)

---

## AWS Components

- **ACM (us-east-1)** — DNS-validated SSL certificate for `dev.mabdullah.dev` and `mabdullah.dev`
- **S3** — Private bucket storing static site assets (`index.html`, `projects.json`, `styles.css`)
- **CloudFront** — CDN providing HTTPS, caching, compression, and secure S3 access via **Origin Access Control (OAC)** using **SigV4**
- **Custom DNS** — Managed externally (DNSSEC disabled for CloudFront compatibility)

## ACM — TLS Certificates for HTTPS

CloudFront requires an SSL/TLS certificate to serve my custom domain over HTTPS (e.g. `dev.mabdullah.dev` and `mabdullah.dev`).  
AWS Certificate Manager (ACM) manages certificates and renewals automatically.

**Important:** CloudFront only supports ACM certificates issued in **`us-east-1`**, which is why Terraform uses that region.

### How it works
1. Terraform requests a DNS-validated ACM certificate.
2. ACM provides a required CNAME validation record.
3. You add this CNAME record in your DNS provider.
4. Terraform waits for the certificate status to become **ISSUED** before creating CloudFront.

#### Example: ACM Certificate + Validation

```hcl
resource "aws_acm_certificate" "this" {
  domain_name       = var.domain_name
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "this" {
  certificate_arn         = aws_acm_certificate.this.arn
  validation_record_fqdns = [
    for opt in aws_acm_certificate.this.domain_validation_options :
    opt.resource_record_name
  ]
}

output "acm_arn" {
  value = aws_acm_certificate.this.arn
}
```

## S3 — Private Storage for Static Website Files

S3 stores the static website files:
- index.html
- projects.json
- styles.css

S3 is configured as private (no public website hosting). Instead, CloudFront is the only public entry point.

### Why private S3?

Because public S3 website hosting is easy to misconfigure and less secure.
A private bucket with CloudFront is the best practice for production.

### Example: S3 Bucket + Public Access Block

```hcl
resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket                  = aws_s3_bucket.this.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "bucket_name" {
  value = aws_s3_bucket.this.bucket
}

output "bucket_domain_name" {
  value = aws_s3_bucket.this.bucket_regional_domain_name
}
```


## CloudFront — CDN + HTTPS + Secure S3 Access

CloudFront provides:
- Global caching (faster site)
- HTTPS termination
- Compression
- Custom domain support
- Secure origin access (CloudFront can read private S3, users cannot)

CloudFront is configured with:
- Default_root_object = "index.html"
- Redirect HTTP → HTTPS
- AWS managed caching policy (CachingOptimized)
- Origin Access Control (OAC) with SigV4 signing for S3

### Why CloudFront?

Without CloudFront:
- S3 website endpoint cannot easily be private
- custom domains and HTTPS are harder
- no edge caching
- more security risk

With CloudFront:
- only CloudFront can access the bucket
- you get a production-grade delivery setup

### Example: CloudFront + Origin Access Control (OAC)

```hcl
resource "aws_cloudfront_origin_access_control" "this" {
  name                              = "${var.domain_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name              = var.bucket_domain_name
    origin_id                = "s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.this.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-origin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true

    # AWS Managed Cache Policy: CachingOptimized
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  viewer_certificate {
    acm_certificate_arn = var.acm_certificate_arn
    ssl_support_method  = "sni-only"
  }

  aliases = [var.domain_name]
}

```

## Putting It Together: Dev Environment Example

This example shows how the dev stack wires modules together for:
- `dev.mabdullah.dev`
- A dedicated dev bucket
- A dedicated dev CloudFront distribution

```hcl
module "s3" {
  source      = "../modules/s3"
  bucket_name = "dev_s3_bucket_name"
}

module "acm" {
  source      = "../modules/acm"
  domain_name = "dev.mabdullah.dev"
}

module "cdn" {
  source              = "../modules/cloudfront"
  bucket_domain_name  = module.s3.bucket_domain_name
  acm_certificate_arn = module.acm.acm_arn
  domain_name         = "dev.mabdullah.dev"
}
```




provider "aws" {
  region = "us-east-1"
}

module "s3" {
  source      = "../modules/s3"
  bucket_name = "dev-mabdullah-dev"
}

module "acm" {
  source      = "../modules/acm"
  domain_name = "dev.mabdullah.dev"
}

module "cdn" {
  source              = "../modules/cloudfront"
  bucket_name         = module.s3.bucket_name
  bucket_domain_name  = module.s3.bucket_domain_name
  acm_certificate_arn = module.acm.arn
  domain_name         = "dev.mabdullah.dev"
}

data "aws_iam_policy_document" "allow_cloudfront_read" {
  statement {
    sid     = "AllowCloudFrontServicePrincipalReadOnly"
    effect  = "Allow"
    actions = ["s3:GetObject"]

    resources = ["${module.s3.bucket_arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = ["arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${module.cdn.distribution_id}"]
    }
  }
}

data "aws_caller_identity" "current" {}

resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = module.s3.bucket_name
  policy = data.aws_iam_policy_document.allow_cloudfront_read.json
}



output "dev_cloudfront_domain" {
  value = module.cdn.domain_name
}

output "dev_cloudfront_distribution_id" {
  value = module.cdn.distribution_id
}
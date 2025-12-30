provider "aws" {
   region = "us-east-1
}

module "s3" {
  source      = "../modules/s3"
  bucket_name = "dev-mabdullah-dev"
}

module "acm" {
  source = "../modules/acm"
  domain = "dev.mabdullah.dev"
}

module "cdn" {
  source        = "../modules/cloudfront"
  bucket_domain = module.s3.bucket_domain_name
  acm_arn       = module.acm.arn
  domain        = "dev.mabdullah.dev"
}

output "dev_bucket_name" {
  value = module.s3.bucket_name
}

output "dev_cloudfront_domain" {
  value = module.cloudfront.domain_name
}

output "dev_cloudfront_distribution_id" {
  value = module.cloudfront.distribution_id
}
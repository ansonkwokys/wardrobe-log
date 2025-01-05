require("dotenv").config();
const {
    PutObjectCommand,
    GetObjectCommand,
    S3Client,
    DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const outfitService = require("../services/outfitService.js");
const outfitQueries = require("../db/queries/outfitQueries.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const outfitBucketName = process.env.BUCKET_NAME;
const outfitBucketRegion = process.env.BUCKET_REGION;
const outfitBucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const outfitBucketSecretAccessKey = proecess.env.BUCKET_SECRET_ACCESS_KEY;
    process.env.BUCKET_SECRET_ACCESS_KEY;

const prefix = "service/";
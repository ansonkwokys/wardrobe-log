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

const prefix = "outfit/";

const s3 = new S3Client({
    credentials: {
        accessKeyId: wardrobeBucketAccessKey,
        secretAccessKey: wardrobeBucketSecretAccessKey,
    },
    region: wardrobeBucketRegion,
});

exports.postNewOutfit = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);

    const newOutfitImageS3ImageKey =
        prefix + outfitService.getRandomOutfitS3ImageKey();
    const imageToS3Params = {
        Bucket: outfitBucketName,
        Key: newOutfitImageS3ImageKey,
        Body: req.file.buffer,
        ContentType: req.file.minetype,
    };
    const imageToS3Command = new PutObjectCommand(imageToS3Params);
    await s3.send(imageToS3Command);

    //first, insert the outfit into the outfit table, and get the outfit id
    req.body.s3ImageKey = newOutfitImageS3ImageKey;
    console.log("req.body, 1st", req.body);
    newOutfitId = await outfitQueries.insertNewOutfit({
        userId: req.session.passport.user,
        s3ImageKey: req.body.s3ImageKey,
    });

    //and then insert each clothing into the outfit_clothing_item table
    const {
        topId,
        topCategoryId,
        bottomId,
        bottomCategoryId,
        outerwearId,
        outerwearCategoryId,
    } = req.body;

    await outfitQueries.insertWardrobeClothingItemToOutfit({
        outfitId: newOutfitId,
        clothingId: topId,
        categoryId: topCategoryId,
    });
    await outfitQueries.insertWardrobeClothingItemToOutfit({
        outfitId: newOutfitId,
        clothingId: bottomId,
        categoryId: bottomCategoryId,
    });
    await outfitQueries.insertWardrobeClothingItemToOutfit({
        outfitId: newOutfitId,
        clothingId: outerwearId,
        categoryId: outerwearCategoryId,
    });

    res.json({});
};

exports.getOutfitByClickCount = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.query", req.query);

    //click count (previous + 1, next - 1, minimum = 0) from react state
    // get two outfit record from database
    twoOutfit = await outfitQueries.fetchTwoOutfitByClickCount({
        clickCount: req.query.clickCount,
        userId: req.session.passport.user,
    });
    if (twoOutfit.rowCount === 0) {
        res.json({ status: "0" });
    }
    //get from s3
    const outfit = twoOutfit[0];
    const s3ImageKey = outfit.s3_image_key;
    const getOutfitParams = {
        Bucket: outfitBucketName,
        Key: s3ImageKey,
    };
    const command = new GetObjectCommand(getOutfitParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    outfit.imageUrl = url;

    if (twoOutfit.rowCount === 1) {
        res.json({ status: "1", outfit: outfit });
    } else {
        res.json({ status: "2", outfit: outfit });
    }
};

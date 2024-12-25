require("dotenv").config();
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3")
//const wardrobeQueries = require("../db/queries/wardrobeQueries.js");
const wardrobeServices = require("../services/wardrobeService.js");
const wardrobeQueries = require("../db/queries/wardrobeQueries.js");


const wardrobeBucketName = process.env.WARDROBE_BUCKET_NAME;
const wardrobeBucketRegion = process.env.WARDROBE_BUCKET_REGION;
const wardrobeBucketAccessKey = process.env.WARDROBE_BUCKET_ACCESS_KEY;
const wardrobeBucketSecretAccessKey =
    process.env.WARDROBE_BUCKET_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: wardrobeBucketAccessKey,
        secretAccessKey: wardrobeBucketSecretAccessKey,
    },
    region: wardrobeBucketRegion,
});

exports.getNewClothingItemForm = async (req, res) => {
    res.render("wardrobeNewClothingItemView");
};

exports.postNewClothingItem = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);

    const newClothingImageName = wardrobeServices.getRandomClothingImageName();
    const imageToS3Params = {
        Bucket: wardrobeBucketName,
        Key: newClothingImageName,
        Body: req.file.buffer,
        ContentType: req.file.minetype,
    };
    const imageToS3Command = new PutObjectCommand(imageToS3Params);
    await s3.send(imageToS3Command);

    //add user id - temporary - change after w/ verification
    const { name, category } = req.body;
    req.body.userId = "1";
    req.body.categoryId = await wardrobeServices.getClothingCategory(category);
    req.body.imageUrl = newClothingImageName;
    console.log("req.body, 2nd", req.body);
    await wardrobeQueries.insertNewClothingItem({
        userId: req.body.userId,
        clothingName: name,
        clothingCategoryId: req.body.categoryId,
        imageUrl: req.body.imageUrl,
    });

    res.send({});
};



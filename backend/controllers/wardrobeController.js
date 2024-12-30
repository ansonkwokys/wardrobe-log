require("dotenv").config();
const {
    PutObjectCommand,
    GetObjectCommand,
    S3Client,
    DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const wardrobeServices = require("../services/wardrobeService.js");
const wardrobeQueries = require("../db/queries/wardrobeQueries.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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

exports.getNewWardrobeClothingItemForm = async (req, res) => {
    res.render("wardrobeNewClothingItemView");
};

exports.postNewWardrobeClothingItem = async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);

    const newClothingImageS3ImageKey =
        wardrobeServices.getRandomClothingS3ImageKey();
    const imageToS3Params = {
        Bucket: wardrobeBucketName,
        Key: newClothingImageS3ImageKey,
        Body: req.file.buffer,
        ContentType: req.file.minetype,
    };
    const imageToS3Command = new PutObjectCommand(imageToS3Params);
    await s3.send(imageToS3Command);

    const { description, category } = req.body;
    req.body.categoryId = await wardrobeServices.getClothingCategory(category);
    req.body.s3ImageKey = newClothingImageS3ImageKey;
    console.log("req.body, 2nd", req.body);
    await wardrobeQueries.insertNewWardrobeClothingItem({
        userId: req.session.passport.user,
        clothingDescription: description,
        clothingCategoryId: req.body.categoryId,
        s3ImageKey: req.body.s3ImageKey,
    });

    res.send({});
};

exports.getAllWardrobeClothingItems = async (req, res) => {
    req.body.userId = "1";
    console.log("req.session", req.session);
    console.log("req.session.id", req.session.id);

    wardrobeClothingItems = await wardrobeQueries.fetchAllWardrobeClothingItems(
        req.session.passport.user
    );

    for (const item of wardrobeClothingItems) {
        s3ImageKey = item.s3_image_key;
        const getWardrobeClothingParams = {
            Bucket: wardrobeBucketName,
            Key: s3ImageKey,
        };
        const command = new GetObjectCommand(getWardrobeClothingParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 600 });
        item.imageUrl = url;
    }

    res.send(wardrobeClothingItems);
};

//note: need new description in the request!
exports.patchWardrobeClothingItem = async (req, res) => {
    //add user id - temporary - chagne after adding verification
    req.body.userId = "1";
    //add clothing description - temporary - prob there will be a form later for inputting
    req.body.clothingId = req.params.id;
    req.body.newClothingDescription = req.query.newClothingDescription;
    console.log("req.body", req.body);
    const { clothingId, newClothingDescription } = req.body;
    await wardrobeQueries.updateWardrobeClothingItems(
        clothingId,
        newClothingDescription
    );

    res.send(req.body);
};

exports.deleteWardrobeClothingItem = async (req, res) => {
    //add user id - temporary - chagne after adding verification
    req.body.userId = "1";
    //add clothing description - temporary - prob there will be a form later for inputting
    req.body.clothingId = req.params.id;

    const { clothingId } = req.body;
    s3ImageKey =
        await wardrobeQueries.fetchWardrobeClothingItemS3ImageKeyByClothingId(
            clothingId
        );
    const deleteImageParams = {
        Bucket: wardrobeBucketName,
        Key: s3ImageKey,
    };

    deleteImageCommand = new DeleteObjectCommand(deleteImageParams);
    await s3.send(deleteImageCommand);
    await wardrobeQueries.removeWardrobeClothingItemByClothingId(clothingId);
    res.send(req.body);
};

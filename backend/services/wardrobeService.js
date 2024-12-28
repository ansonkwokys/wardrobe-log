const NodeCache = require("node-cache");
const crypto = require("crypto");
const wardrobeQueries = require("../db/queries/wardrobeQueries.js");
const clothingCategoryCache = new NodeCache({
    stdTTL: 600,
    checkperiod: 120,
});

exports.getClothingCategory = async (category) => {
    let clothingCategoryId = clothingCategoryCache.get(category);

    if (clothingCategoryId) {
        console.log("Cache hit");
        return clothingCategoryId;
    }

    console.log("Cache miss");
    clothingCategoryId = wardrobeQueries.fetchWardrobeClothingItemCategoryId(category);
    clothingCategoryCache.set(category, clothingCategoryId);
    console.log(clothingCategoryCache.keys());
    return clothingCategoryId;
};

exports.getRandomClothingS3ImageKey = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

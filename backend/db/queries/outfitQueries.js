const pool = require("../pool");
const OUTFIT_TABLE = "outfit";
const OUTFIT_CLOTHING_ITEM_TABLE = "outfit_clothing_item";

// return new insert outfit id
exports.insertNewOutfit = async ({ userId, s3ImageKey }) => {
    const result = await pool.query(
        `INSERT INTO ${OUTFIT_TABLE} (user_id, s3_image_key) VALUES ($1, $2)`,
        [userId, s3ImageKey]
    );
    return result.rows[0].outfit_id
};

exports.insertWardrobeClothingItemToOutfit = async ({
    outfitId,
    clothingId,
    categoryId,
}) => {
    await pool.query(
        `INSERT INTO ${OUTFIT_CLOTHING_ITEM_TABLE} (outfit_id, clothing_id, category_id) VALUES ($1, $2, $3)`,
        [outfitId, clothingId, categoryId]
    );
};

exports.fetchTwoOutfitByClickCount = async ({
    clickCount, userId
}) => {
    const result = await pool.query(
        `SELECT * FROM outfit WHERE user_id=$1 ORDER BY created_at DESC OFFSET $2 LIMIT 2`,
        [userId, clickCount]
    );
    return result;
}
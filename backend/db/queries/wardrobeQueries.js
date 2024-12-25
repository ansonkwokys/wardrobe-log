const pool = require("../pool");
const WARDROBE_TABLE = "wardrobe";
const CLOTHING_CATEGORY_TABLE = "clothing_categories";

exports.insertNewWardrobeClothingItem = async ({
    userId,
    clothingDescription,
    clothingCategoryId,
    s3ImageKey,
}) => {
    //clothingStatus = "wardrobe";
    await pool.query(
        `INSERT INTO ${WARDROBE_TABLE} (user_id, description, category_id, s3_image_key) VALUES ($1, $2, $3, $4)`,
        [userId, clothingDescription, clothingCategoryId, s3ImageKey]
    );
};


exports.fetchWardrobeClothingItemCategoryId = async (category) => {
    const results = await pool.query(
        `SELECT category_id FROM ${CLOTHING_CATEGORY_TABLE} WHERE name=$1`,
        [category]
    );
    return results.rows[0].category_id;
};


exports.fetchAllWardrobeClothingItems = async (userId) => {
    const results = await pool.query(
        `SELECT * From ${WARDROBE_TABLE} WHERE user_id=$1`,
        [userId]
    );
    return results.rows;
};

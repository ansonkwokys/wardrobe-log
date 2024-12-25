const pool = require("../pool");
const WARDROBE_TABLE = "wardrobe";
const CLOTHING_CATEGORY_TABLE = "clothing_categories";

insertNewClothingItem = async ({
    userId,
    clothingName,
    clothingCategoryId,
    imageUrl,
}) => {
    //clothingStatus = "wardrobe";
    await pool.query(
        `INSERT INTO ${WARDROBE_TABLE} (user_id, name, category_id, image_url) VALUES ($1, $2, $3, $4)`,
        [userId, clothingName, clothingCategoryId, imageUrl]
    );
};

getClothingItemCategoryId = async (category) => {
    const results = await pool.query(
        `SELECT category_id FROM ${CLOTHING_CATEGORY_TABLE} WHERE name=$1`,
        [category]
    );
    return results.rows[0].category_id;
};

module.exports = {
    insertNewClothingItem,
    getClothingItemCategoryId,
};

const pool = require("../pool");
const USERS_TABLE = "users";

exports.fetchUserIdwithGoogleProfile = async (email) => {
    const results = await pool.query(
        `SELECT user_id FROM ${USERS_TABLE} WHERE email=$1`,
        [email]
    );
    if (results.rowCount === 0) {
        return null;
    }
    return results.rows[0].user_id;
};

exports.insertNewUser = async (
    firstName,
    lastName,
    email,
    googleId,
    profilePictureUrl
) => {
    await pool.query(
        `INSERT INTO ${USERS_TABLE} (first_name, last_name, email, google_id, profile_picture_url) VALUES 
        ($1, $2, $3, $4, $5)`,
        [firstName, lastName, email, googleId, profilePictureUrl]
    );
    return;
};

exports
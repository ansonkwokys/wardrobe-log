#! /usr/bin/env node
require("dotenv").config({ path: "../.env" });
const { Client } = require("pg");

const outfitClothingItemTable = `
CREATE TABLE IF NOT EXISTS outfit_clothing_item (
    outfit_id INT NOT NULL REFERENCES outfit(outfit_id) ON DELETE CASCADE,
    clothing_id INT NOT NULL REFERENCES wardrobe(clothing_id),
    category_id INT NOT NULL REFERENCES clothing_categories(category_id),
    PRIMARY KEY (outfit_id, clothing_id)
);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    await client.connect();
    await client.query(outfitClothingItemTable);
    await client.end();
    console.log("done");
}

main();

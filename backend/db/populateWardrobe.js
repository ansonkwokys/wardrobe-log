#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const wardrobeTable = `
CREATE TYPE clothing_status AS ENUM ('wardrobe', 'hanging', 'laundry_basket');
CREATE TABLE IF NOT EXISTS wardrobe (
    clothing_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL REFERENCES cloth_categories(category_id),
    image_url TEXT,
    last_worn DATE,
    status clothing_status DEFAULT 'wardrobe'
);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    await client.connect();
    await client.query(wardrobeTable);
    await client.end();
    console.log("done");
}

main();

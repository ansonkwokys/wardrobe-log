#! /usr/bin/env node
require("dotenv").config({ path: "../.env" });
const { Client } = require("pg");

const outfitTable = `
CREATE TABLE IF NOT EXISTS outfit (
    outfit_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    await client.connect();
    await client.query(outfitTable);
    await client.end();
    console.log("done");
}

main();


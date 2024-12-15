#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const categoryTable = `
CREATE TABLE IF NOT EXISTS cloth_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);
INSERT INTO cloth_categories (name) VALUES
('tops'), ('bottoms');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    await client.connect();
    await client.query(categoryTable);
    await client.end();
    console.log("done");
}

main();

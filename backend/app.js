require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("node:path");
const app = express();
const cors = require("cors");
const PORT = 3000;
const wardrobeRouter = require("./routers/wardrobeRouter");
const authRouter = require("./routers/authRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({ 
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookies: {maxAge: 60000 * 60},

}))

app.use("/auth", authRouter);
app.use("/wardrobe", wardrobeRouter);

//error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
    console.log(`Wardrobe-Log - listening on port ${PORT}!`);
});

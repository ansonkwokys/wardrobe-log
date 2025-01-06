require("dotenv").config();
const express = require("express");
const passport = require("../auth/authConfig.js");

const authRouter = express.Router();

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.FRONTEND_URL}/wardrobe`,
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
    })
);

module.exports = authRouter;

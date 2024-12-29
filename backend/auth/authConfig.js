require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authQueries = require("../db/queries/authQueries");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async function (request, accessToken, refreshToken, profile, done) {
            console.log("Google Profile: ", profile);
            let userId = await authQueries.fetchUserIdfromGoogleProfile(
                profile._json.email
            );
            if (userId === null) {
                const { email, given_name, family_name, sub, picture } =
                    profile._json;
                await authQueries.insertNewUser(
                    given_name,
                    family_name,
                    email,
                    sub,
                    picture
                );
                userId = await authQueries.fetchUserIdfromGoogleProfile(
                    profile._json.email
                );
            }
            profile.user_id = userId;
            done(null, profile);
        }
    )
);

module.exports = passport;


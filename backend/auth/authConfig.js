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
            let userId = await authQueries.fetchUserIdwithGoogleProfile(
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
                userId = await authQueries.fetchUserIdwithGoogleProfile(
                    profile._json.email
                );
            }
            profile.user_id = userId;
            done(null, profile);
        }
    )
);

passport.serializeUser((profile, done) => {
    let userId = profile.user_id;
    done(null, userId);
});

passport.deserializeUser(async (userId, done) => {
    try {
        user = await authQueries.fetchUserWithUserId(userId);
        if (!user) {
            return done(new Error("User not found"));
        }
        done(null, user);
    } catch (err) {
        done(err);
    }
});

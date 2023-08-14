import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
dotenv.config();

passport.use(
    "auth-google",
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google"
  },
  function(accessToken, refreshToken, profile, cb) {

      return cb(null, profile);
      
  }
));
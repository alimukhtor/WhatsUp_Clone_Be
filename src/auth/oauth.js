import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import UserModel from "../users/schema.js";
import jwt from 'jsonwebtoken'
import { JWTAuthenticate } from "./tools.js";
// import { JWTAuthenticate } from "./tools.js";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: `${process.env.API_URL}/users/googleRedirect`,
  },
  async (accessToken, refreshToken, profile, passportNext) => {
    try {
      console.log("PROFILE: ", profile);

      const user = await UserModel.findOne({ googleId: profile.id });

      if (user) {
        const tokens = await JWTAuthenticate(user)
        // jwt.sign({ _id: user._id}, process.env.MY_SECRET_KEY, {expiresIn:"1w"})

        passportNext(null, { tokens });
      } else {
        const newUser = new UserModel({
          email: profile.emails[0].value,
          avatar:profile.photos[0].value,
          googleId: profile.id,
        });

        const savedUser = await newUser.save();
        
        const tokens = await JWTAuthenticate(savedUser)
        // jwt.sign({ _id: savedUser._id}, process.env.MY_SECRET_KEY, {expiresIn:"1w"})
        passportNext(null, { tokens });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

passport.serializeUser(function (data, passportNext) {
  passportNext(null, data);
});

export default googleStrategy;

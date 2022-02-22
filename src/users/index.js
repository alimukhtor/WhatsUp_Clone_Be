import express from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { JWTAuthMiddleware } from "../auth/token.js";
import UserModel from "./schema.js";
import passport from "passport";
import { v2 as Cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const userRouter = express.Router();

// ***************** CLOUDINARYIMAGE UPLOAD***************

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  params: {
    folder: "whatsup",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => "new",
  },
});

const parser = multer({ storage: storage });

userRouter.get("/", async (req, res, next) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/googleRedirect",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONT_END_URL}`,
  }),
  async (req, res, next) => {
    try {
      console.log("Token:", req.user.tokens);
      res.redirect(
        `${process.env.FRONT_END_URL}?accessToken=${req.user.tokens}`
      );
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post("/register", async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.checkCredentials(email, password);
    if (user) {
      const accessToken = await JWTAuthenticate(user);
      // jwt.sign({ _id: user._id}, process.env.MY_SECRET_KEY, {expiresIn:"1w"},)
      res.send({ accessToken });
    } else {
      next(createHttpError(404, "User not found!"));
    }
  } catch (error) {
    next(error);
  }
});


userRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.send({ message: "No Token Provided!" });
    const users = await UserModel.findById(req.user);
    if(users){
        res.status(200).send(users)
    }else{
        next(createHttpError(404, "User not found!"))
    }
  } catch (error) {
    next(error);
  }
});

userRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.user, req.body, {new:true})
    res.send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/me/avatar", JWTAuthMiddleware, parser.single("image"), async (req, res, next) => {
    try {
        res.json(req.file);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/:id", async (req, res, next) => {
  try {
    const users = await UserModel.findById(req.params.id);
    if (users) {
      res.status(200).send(users);
    } else {
      next(
        createHttpError(404, `User with an id ${req.params.id} is not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/logout",async(req, res)=>  {
    
  });;

// userRouter.post("/session/refresh", async (req, res, next) => {});

export default userRouter;

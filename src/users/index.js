import express from 'express'
import createHttpError from 'http-errors';
import jwt from "jsonwebtoken";
import { JWTAuthMiddleware } from '../auth/token.js';
import UserModel from './schema.js'
import passport from 'passport';
import { JWTAuthenticate } from '../auth/tools.js';

const userRouter = express.Router()



userRouter.get("/", JWTAuthMiddleware, async(req, res, next)=> {
    try {
        const user = await UserModel.find()
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
})

userRouter.get("/googleLogin", passport.authenticate("google", { scope: ["profile", "email"] })
) 

userRouter.get("/googleRedirect", passport.authenticate("google", {failureRedirect:`${process.env.FRONT_END_URL}`}), async(req,res,next)=> {
    try {
        console.log("Token:", req.user.tokens);
        res.redirect(
            `${process.env.FRONT_END_URL}?accessToken=${req.user.tokens}`)
    } catch (error) {
        next(error)
    }
})


userRouter.post("/register", async(req, res, next)=> {
    try {
        const user = new UserModel(req.body)
        const newUser = await user.save()
        res.status(201).send(newUser)
    } catch (error) {
        next(error)
    }
})

userRouter.post("/login", async(req, res, next)=> {
    try {
        const {email, password} = req.body
        const user = await UserModel.checkCredentials(email, password)
        if(user){
            const accessToken = await JWTAuthenticate(user)  
            // jwt.sign({ _id: user._id}, process.env.MY_SECRET_KEY, {expiresIn:"1w"},)
            res.send({accessToken})
        }else{
            next(createHttpError(404, "User not found!"))
        }
    } catch (error) {
        next(error)
    }
})

userRouter.put("/me", async(req, res, next)=> {})

userRouter.post("/me/avatar", async(req, res, next)=> {})

userRouter.get("/:userId", async(req, res, next)=> {})

userRouter.post("/account", async(req, res, next)=> {})

userRouter.post("/session", async(req, res, next)=> {})

userRouter.delete("/session", async(req, res, next)=> {})

userRouter.post("/session/refresh", async(req, res, next)=> {})


export default userRouter
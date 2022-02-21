import createHttpError from "http-errors";
import jwt from 'jsonwebtoken'
import { verifyJWT } from "./tools.js";
export const JWTAuthMiddleware =async(req, res, next)=> {
    try {
        if(!req.headers.authorization){
            next(createHttpError(401, "please provide bearer token in authorization headers!"))
        }else{
            const token = req.headers.authorization.replace("Bearer ", "")
            const payload = await verifyJWT(token)
            // jwt.verify(token, process.env.MY_SECRET_KEY)
            req.user = {
                _id:payload._id,
            }
            next()
        }
        
    } catch (error) {
        next(createHttpError(401, "Author is unauthorized!"))
    }
}
import express from 'express'

const userRouter = express.Router()

userRouter.get("/", async(req, res, next)=> {
    try {
        
    } catch (error) {
        
    }
})

userRouter.get("/", async(req, res, next)=> {})

userRouter.put("/me", async(req, res, next)=> {})

userRouter.post("/me/avatar", async(req, res, next)=> {})

userRouter.get("/:userId", async(req, res, next)=> {})

userRouter.post("/account", async(req, res, next)=> {})

userRouter.post("/session", async(req, res, next)=> {})

userRouter.delete("/session", async(req, res, next)=> {})

userRouter.post("/session/refresh", async(req, res, next)=> {})


export default userRouter
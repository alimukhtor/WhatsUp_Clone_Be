import express from 'express'
//import MessageModel from './schema.js'
export default {}

const messageRouter = express.Router()

messageRouter.get("/", async(req,res,next)=> {
    try {
        const message = await MessageModel.find()
        res.send(message)
    } catch (error) {
        next(error)
    }
})

messageRouter.post("/", async(req,res,next)=> {
    try {
        const message = new MessageModel(req.body)
        const newMesage = await message.save()
        res.send(newMesage)
        res.send(message)
    } catch (error) {
        next(error)
    }
})

//export default messageRouter
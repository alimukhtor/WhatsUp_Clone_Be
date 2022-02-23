import express from "express"
import createHttpError from "http-errors"
import chatModel from "./schema.js"
import { JWTAuthMiddleware } from "../auth/token.js"

const chatRouter = express.Router()

chatRouter.get("/", async (req, res, next) => {
  try {

    const chats = await chatModel.find({
        members: req.user ,
      },
     )
    if (chats) {
      res.send(chats)
    } else {
      next(createHttpError(404, `chats not found!`))
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
})

chatRouter.get("/:chatId", async (req, res, next) => {
  try {
    const chat = await chatModel.findById(req.params.chatId);
    if (chat) {
      if (chat.members.includes(req.user)) {
        res.send(chat);
      } else {
        next(createHttpError(403, "Unauthorized"));
      }
    } else {
      next(createHttpError(404, "not found"));
    }

  } catch (error) {
    next(error)
  }
})

chatRouter.post("/", async (req, res, next) => {
  try { 

    // req.user is the first member of the chat
    // req.body.recipient is the second one

    // Check if there is already a Chat where memebrs === [req.user, req.body.recipient]
    const checkChatExists = await chatModel.findOne({
      members: { $all: [req.user, req.body.recipient] },
    });
  
    if (checkChatExists) {
      res.send(checkChatExists);
    } else {
      const newChat = new chatModel({
        members: [req.user, req.body.recipient],
      });
      const createdChat = await newChat.save();
      res.status(201).send(createdChat)
    
  }} catch (error) {
    next(error)
  }
})


export default chatRouter

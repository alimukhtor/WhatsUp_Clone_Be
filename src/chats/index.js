import { Router } from "express"
import createHttpError from "http-errors"
import chatModel from "./schema.js"
import { JWTAuthMiddleware } from "../auth/token.js"
const chatRouter = Router()

chatRouter.get("/", async (req, res, next) => {
  try {

    const chats = await chatModel.find({
        members: { $in: [req.user] },
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
  } catch (error) {
    next(error)
  }
})

chatRouter.put("/:id", async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

chatRouter.delete("/:id", async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  }
)

export default chatRouter

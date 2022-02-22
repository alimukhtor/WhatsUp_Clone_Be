import { Router } from "express"
import createHttpError from "http-errors"
import chatModel from "./schema.js"

const chatRouter = Router()

chatRouter.get("/", async (req, res, next) => {
  try {const chatId = req.params.chatId

    const chat = await chatModel.find(chatId).populate("members")
    if (chat) {
      res.send(chat)
    } else {
      next(createHttpError(404, `chat with id ${chatId} not found!`))
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
})

chatRouter.get("/:id", async (req, res, next) => {
  try {

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

import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import passport from 'passport'
// import { unauthorizedHandler, forbiddenHandler, catchAllHandler} from './errorHandler/errorHandlers.js'
import googleStrategy from './auth/oauth.js'
import chatRouter from './chats/index.js'


const server = express()
const port = process.env.PORT || 3001

import userRouter from './users/index.js'

// ************************************* MIDDLEWARES *****************************

passport.use("google", googleStrategy)
server.use(cors())
server.use(express.json())
server.use(passport.initialize())

// *************************************** ROUTES ********************************

server.use("/users", userRouter)
server.use("/chats", chatRouter)



// ****************************** ERROR HANDLERS **************************

// server.use(unauthorizedHandler)
// server.use(forbiddenHandler)
// server.use(catchAllHandler)


// ************************************** DB CONNECTIONS **********************************

mongoose.connect("mongodb+srv://alimukhtor:alimukhtor@cluster0.9wscl.mongodb.net/whatsup?retryWrites=true&w=majority")
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })
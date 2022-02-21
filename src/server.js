import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import { unauthorizedHandler, forbiddenHandler, catchAllHandler} from './errorHandler/errorHandlers.js'
const server = express()
const port = process.env.PORT || 3001

import userRouter from './users/index.js'

// ************************************* MIDDLEWARES *****************************

server.use(cors())
server.use(express.json())

// *************************************** ROUTES ********************************

server.use("/users", userRouter)



// ****************************** ERROR HANDLERS **************************

server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)


// ************************************** DB CONNECTIONS **********************************

mongoose.connect("mongodb+srv://alimukhtor:alimukhtor@cluster0.9wscl.mongodb.net/whatsup?retryWrites=true&w=majority")
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })
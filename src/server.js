import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import passport from 'passport'
import googleStrategy from './auth/oauth.js'


const server = express()
const port = process.env.PORT || 3001

passport.use("google", googleStrategy)
server.use(cors())
server.use(express.json())


mongoose.connect("mongodb+srv://alimukhtor:alimukhtor@cluster0.9wscl.mongodb.net/whatsup?retryWrites=true&w=majority")
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })
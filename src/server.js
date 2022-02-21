import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
const server = express()
server.use(express.json())

const port = process.env.PORT || 3001


mongoose.connect("mongodb+srv://alimukhtor:alimukhtor@cluster0.9wscl.mongodb.net/whatsup?retryWrites=true&w=majority")
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })
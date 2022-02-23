import mongoose from "mongoose";
import { MessageSchema } from "../message/schema.js";

const { Schema, model } = mongoose;

const ChatSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [MessageSchema],

});

export default model("Chat", ChatSchema);

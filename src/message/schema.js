import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MessageSchema = new Schema(
  {
    sender: { type: String, required: true },
    content: {
      text: { type: String, required: true },
      media: { type: String },
    },
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);

import mongoose from 'mongoose'
const {Schema, model} = mongoose

const UserSchema = new Schema({
    username:{type:String},
    email:{type:String}, unique:true,
    password:{type:String},
    avatar:{type:String}
})


export default model("User", UserSchema)
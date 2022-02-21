import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const {Schema, model} = mongoose

const UserSchema = new Schema({
    username:{type:String},
    email:{type:String, unique:true},
    password:{type:String},
    avatar:{type:String}
})

UserSchema.pre("save", async function(next){
    const newUser = this
    const plainPassword = newUser.password
        const hashPW = await bcrypt.hash(plainPassword, 10)
        newUser.password = hashPW
        next()
})

UserSchema.methods.toJSON = function () {
    const userInfo = this
    const userObject = userInfo.toObject()
    delete userObject.password
    delete userObject.__v
  
    return userObject
}

UserSchema.statics.checkCredentials = async function(email, plainPassword){
    const user = await this.findOne({email})
    if(user){
        const isMatch = await bcrypt.compare(plainPassword, user.password)
        if(isMatch){
            return user
        }else{
            return null
        }
    }else{
        return null
    }
} 
export default model("User", UserSchema)
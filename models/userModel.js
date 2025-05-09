import mongoose from "mongoose";
const userSchema= mongoose.Schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true,unique:true},
    motDePasse: {type : String,required:true},
    image:{type:String}
})

const userModel= mongoose.model('user',userSchema)
export default userModel


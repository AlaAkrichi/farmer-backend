import mongoose from "mongoose";
const productSchema= mongoose.Schema({
    nomFarm:{type:String,required:true,unique:true},
    adresse:{type:String,required:true},
    codePostal:{type:Number,required:true},
    Ville:{type:String,required:true},
    Superficie: {type : Number,required:true},
    farmer:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    pictures: {
        type: [String],
        default: [] 
    }

})

const farmModel= mongoose.model('farm',farmeSchema)
export default farmModel

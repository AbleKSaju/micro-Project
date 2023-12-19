import mongoose from 'mongoose'
const productModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

const Product=mongoose.model('product',productModel)
export default Product
import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
  product: [
    {
      product_id: String,
    },
  ],
  user: String,
  totalPrice: {
    type:Number,
    requires:true
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
const order = mongoose.model("order", orderSchema);
export default order
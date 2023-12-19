import express from "express";
import Product from "../model/productModel.js";
import isAuthenticated from "../../isAuthenticated.js"
const router = express.Router();

router.post("/addProduct", isAuthenticated, (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (name && description && price) {
      const newProduct = new Product({
        name,
        description,
        price,
      });
    //   newProduct.save();
    console.log('success');
      res.json({ message: newProduct });
    }
  } catch (error) {
    console.log(error);
    res.json({message:error})
  }
});

router.post("/buyProduct",(req,res)=>{
    const {ids}=req.body
})

export default router;

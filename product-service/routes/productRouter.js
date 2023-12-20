import express from "express";
import Product from "../model/productModel.js";
import isAuthenticated from "../../isAuthenticated.js";
import { channel, connection } from "../config/rabbitmq.js";
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
      newProduct.save();
      res.json({ message: newProduct });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

router.post("/buyProduct", isAuthenticated, async (req, res) => {
  const { ids } = req.body;
  console.log(ids, "ids");
  const products = await Product.find({ _id: { $in: ids } });
  console.log(products, "pro");
  channel.sendToQueue(
    "ORDER",
    Buffer.from(
      JSON.stringify({
        products: products,
        email: req.user.email,
      })
    )
  );
  var order;
  try {
    await channel.consume("PRODUCT", (data) => {
      console.log("consuming Product");
      order = JSON.parse(data.content);
      channel.ack(data);
      if (order.order) {
        return res.json(order);
      }
    });
  } catch (error) {
    console.log("ERROR", error);
  }
});

export default router;

import express from "express";
import { channel } from "../config/rabbitmq.js";
import order from "../model/orderModel.js";
const router = express.Router();

const createOrder = (products, email) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price;
  }
  const newOrder = new order({
    product: products,
    user: email,
    totalPrice: total,
  });
  newOrder.save();
  return newOrder;
};

export const newOrder = () => {
  channel.consume("ORDER", async (data) => {
    try {
      const { products, email } = JSON.parse(data.content.toString());
      const order = createOrder(products, email);
      console.log(order, "OD");
      channel.ack(data);
      channel.sendToQueue("PRODUCT", Buffer.from(JSON.stringify({ order })));
      console.log("consuming order queue");
    } catch (error) {
      console.log(error);
    }
  });
};

export default router;

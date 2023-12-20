import express, { json } from "express";
import connectDB from "./config/db.js";
import orderRouter, { newOrder } from "./routes/orderRouter.js";
import connect, { channel } from "./config/rabbitmq.js";
const app = express();
const PORT = 9090;
connectDB();
connect().then(() => {
  newOrder()
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/orders", orderRouter);
app.listen(PORT, () => console.log(`Server Connecteed on port ${PORT}`));

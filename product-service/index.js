import express from 'express'
import connectDB from './config/db.js'
import productRouter from './routes/productRouter.js'
import connect from './config/rabbitmq.js';
const app=express()
const PORT=8080
connectDB()
// connect()
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/api/products',productRouter)
app.listen(PORT,()=>console.log(`Server Connecteed on port ${PORT}`))
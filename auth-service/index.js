import express from 'express'
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js'
const app=express()
const PORT=3000
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/api/users',userRouter)
app.listen(PORT,()=>console.log(`Server Connecteed on port ${PORT}`))

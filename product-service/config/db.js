import mongoose from "mongoose";

const connectDB = async () => {
    console.log('mongoose');
    try {
        const conn = await mongoose.connect('mongodb+srv://ableksaju:Able4621@cluster0.zpzidrr.mongodb.net/product?retryWrites=true&w=majority');
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
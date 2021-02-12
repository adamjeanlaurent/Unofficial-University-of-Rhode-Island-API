// npm
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI!;

try {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

catch(error: any) {
    throw new Error(error.message);
}

export default mongoose;
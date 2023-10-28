import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();

dotenv.config();
const port = process.env.PORT || 8000
const corsOptions = {
    origin: true,
    credentials: true
}

mongoose.set('strictQuery', false);

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB database connected')
    }catch(err){
        console.log('MongoDB database connection failed');
    }
}

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.listen(port, () => {
    connectDb();
    console.log('app is listening on port', port); 
})
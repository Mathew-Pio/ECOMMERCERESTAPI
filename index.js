import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
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
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/orders', orderRoutes);

app.listen(port, () => {
    connectDb();
    console.log('app is listening on port', port); 
})
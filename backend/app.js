import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path'

import AuthRoute from './routes/AuthRoutes.js'
import errorHandler from './middlewares/errorHandler.js';
import docuRoute from './routes/DocumentRoute.js'
import dashboard from './routes/DashboardRoute.js';
import aiChat from './routes/AIChatRoute.js'
// server creation
const app=express();

// database connected
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

// routers
app.use('/api/auth',AuthRoute);
app.use('/api',docuRoute);
app.use('/api',dashboard)
app.use('/api',aiChat);

// error handling middleware
app.use(errorHandler);

app.use((req,res)=>{
    res.status(400).json({
        statusCode:400,
        success:false,
        message:"Route not found"
    });
});

// server started
app.listen(3000,()=>{
    console.log("connected to server 3000");
})

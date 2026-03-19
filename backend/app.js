import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';

import AuthRoute from './routes/AuthRoutes.js'
import errorHandler from './middlewares/errorHandler.js';
import docuRoute from './routes/DocumentRoute.js'
import dashboard from './routes/DashboardRoute.js';
// server creation
const app=express();

// database connected
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routers
app.use('/api/auth',AuthRoute);
app.use('/api',docuRoute);
app.use('/api',dashboard)
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

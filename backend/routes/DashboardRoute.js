import express from 'express';
import protect from '../middlewares/auth.js';
import { dashboard } from '../controllers/Dashboard/DashboardController.js';

const router=express.Router();

router.get('/dashboard/info',protect,dashboard);

export default router;
import express from 'express'
import { Register, Login, getProfile, resetPassword } from '../controllers/Auth/AuthController.js'
import { loginValidation, registerValidation } from '../middlewares/validation.js'
import protect from '../middlewares/auth.js';

const router=express.Router();

router.post('/register',registerValidation, Register);
router.post('/login',loginValidation,Login);
router.get('/user/details',protect,getProfile);
router.post('/user/resetPassword',protect,resetPassword);
export default router;
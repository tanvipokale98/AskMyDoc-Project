import express from 'express'
import { Register, Login } from '../controllers/Auth/auth.js'
import { loginValidation, registerValidation } from '../middlewares/validation.js'

const router=express.Router();

router.post('/register',registerValidation, Register);
router.post('/login',loginValidation,Login);

export default router;
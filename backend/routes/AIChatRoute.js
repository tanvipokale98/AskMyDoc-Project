import express from 'express'
import protect from '../middlewares/auth.js'
import { AiChatHistory, chat } from '../controllers/AiChat/AiChatController.js';

const router=express.Router();

router.use(protect);
router.post('/document/:id/chat',chat);
router.get('/document/:id/chat/history',AiChatHistory);
export default router
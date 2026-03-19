import express from 'express'
import protect from '../middlewares/auth.js'
import { uploadDoc } from '../controllers/UploadDoc/UploadDocController.js';
import upload from '../config/multer.js';
const router = express.Router();
router.use(protect);

router.post('/documents/upload',upload.single('file'),uploadDoc);

export default router;
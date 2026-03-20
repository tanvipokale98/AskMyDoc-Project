import express from 'express'
import protect from '../middlewares/auth.js'
import { uploadDoc } from '../controllers/UploadDoc/UploadDocController.js';
import upload from '../config/multer.js';
import { getDocuments, getPDF, getSummary } from '../controllers/Document/DocumentController.js';
const router = express.Router();
router.use(protect);

router.post('/documents/upload',upload.single('file'),uploadDoc);
router.get('/documents/info',getDocuments);
router.get('/document/:id/summarize',getSummary);
router.get('/document/:id/pdf', getPDF);
export default router;
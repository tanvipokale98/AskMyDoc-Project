import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const uploadDir = path.join(__dirname,'../uploads/documents');

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// 2. Filter for PDF files only
const pdfFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: pdfFilter });

export default upload;
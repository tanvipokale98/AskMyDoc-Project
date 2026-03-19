import Document from "../../modals/DocumentModal.js";
import { textChunker } from "../../services/TextChunk.js";
import { extractText } from "../../services/TextParser.js";
import { generateEmbeddings } from "../../services/generateEmbeddings.js";
import { storeChunks } from "../../services/storeEmbeddings.js";
import path from 'path'
export const uploadDoc = async (req, res,next)=>{
  console.log("reached in docController");
    try{

        const id = req.user._id;
        const file =req.file;
        const {title} =req.body;
        if(!file){
            return res.status(400).json({
                statusCode:400,
                success:false,
                message:"No file uploaded"
            });
        }
        
        if(!title){
        return res.status(400).json({
                statusCode:400,
                success:false,
                message:"Please provide a title"
            });
        }

        const fileUrl=`http://localhost:3000/uploads/documents/${req.file.filename}`
       const filePath = path.join('uploads', 'documents', req.file.filename)
        const doc=await Document.create({
            userid:id,
            title:title,
            originalName:req.file.filename,
            docUrl:fileUrl,
            status:'uploaded',
            mime:req.file.mimetype,
            size:req.file.size
        });

        try{
            const texts=await extractText(filePath);
            const chunks=await textChunker(texts.text);

            const resp=await Document.findByIdAndUpdate(doc._id,{
                pageCount:texts.numPgs,
                chunkCount: chunks.length
            });
            
            const embeddings=await generateEmbeddings(chunks);
           await storeChunks(doc._id,chunks,embeddings);
            
            await Document.findByIdAndUpdate(doc._id,{
                status:"processed"
            })
             
            return res.status(200).json({
                
                statusCode:200,
                success:true,
                message:"Document uploaded and processed successfully"
            });
            

        }catch(err){
            await Document.findByIdAndUpdate(doc._id,{
                status:"failed"
            })
            next(err);
        }
        

    }catch(err){
       next(err);
    }

}
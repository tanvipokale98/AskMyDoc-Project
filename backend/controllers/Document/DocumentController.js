import Document from '../../modals/DocumentModal.js'
import { generateSummary } from '../../services/generateSummary.js';



export const getDocuments= async(req,res,next) =>{

    try{
    
        const userid=req.user.id;
        
        const docs = await Document.find({
      userid: userid,
      status: { $in: ['uploaded','processed','summarized'] }
    }).sort({ createdAt: -1 })
         
     return res.status(200).json({
        statusCode:200,
        success:true,
        message:"Data fetched successfully",
        data: docs
     });

    }catch(err){
        next(err);
    }

}

export const getPDF = async(req,res,next)=>{

    try{

    const {id}=req.params;

    const filePath=await Document.findById(id).select('+docUrl');
    if(!filePath){
        return res.status(500).json({
            success:false,
            message:"cannot find the document",
            statusCode:500
        });
    }

    return res.status(200).json({
            success:true,
            message:"Document Fetched successfully",
            statusCode:200,
            data:filePath.docUrl
        });

    }catch(err){
        next(err);
    }

}

export const getSummary =async(req,res,next)=>{
    try{
 const docid=req.params.id;
 const regenerate=req.query.regenerate;

  const prevSumm= await Document.findById(docid);
  let summary=prevSumm.summary;
  if(prevSumm.status==='failed'){
    return res.status(500).json({
        success:false,
        statusCode:500,
        message:"Failed to process the document. Please upload again"
    })
  }
  if(regenerate==='true'){
      const result = await generateSummary(prevSumm.summary);
      summary=result;
  }
  
   const resp=await Document.findByIdAndUpdate(docid,{
    summary:summary,
    status:'summarized'
   });

    return res.status(200).json({
        statusCode:200,
        success:true,
        message:"Document Summarized Successfully",
        data:{summary}
    })
    }catch(err){
        next(err);
    }

}
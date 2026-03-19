import Document from "../../modals/DocumentModal.js";

export const dashboard=async (req,res,next)=>{
  try{
const id =req.user._id;

    const totalDoc=await Document.aggregate([
        {$match: {userid:id}},
        {$count: "totalDoc"}
    ]);

    const totalSumm= await Document.aggregate([
        {$match:{userid:id, status:'summarized'}},
        {$count:"totalSm"}
    ]);
    const recent = await Document.aggregate([
      { $match: { userid: id } },
      { $sort: { createdAt: -1 } },        
      { $limit: 5 },                        
      { $project: {                         
          title: 1,
          originalName: 1,
          status: 1,
          size: 1,
          createdAt: 1
        }
      }
    ])
    const storage=await Document.aggregate([
      { $match: { userid: id } },
      { $group: {                           
          _id: null,
          totalStorage: { $sum: "$size" }  
        }
      }
    
    ])
    const result={
        totalDoc:totalDoc[0]?.totalDoc || 0,
        summarize:totalSumm[0]?.totalSm || 0,
        storage:storage[0]?.totalStorage || 0,
        recent:recent
    }
    

    return res.status(200).json({
        success:true,
        statusCode:200,
        message:"Data Fetched Successfully",
        data:result
    });
  }catch(err){
    next(err);
  }
}

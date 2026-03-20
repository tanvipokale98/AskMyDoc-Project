import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
   
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please provide user id"]
    },
    title:{
        type:String,
        trim:true,
        required:[true,"Please provide title"]
    },
    originalName:{
        type:String,
        trim:true,
        required:[true,"Please Provide document name"]
    },
    docUrl:{
        type:String,
        trim:true,
        required:[true,"Please provide doc"]
    },
    size:{
        type:Number,
        required:[true]
    },
    status:{
        type:String,
        enum:['uploaded','processed','summarized','failed'],
        default:'uploaded'
    },
    mime:{
       type: String,
    enum: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
    required: [true, "Please provide mime type"]
    },
    pageCount:{
        type:Number,
        default:null
    },
   chunkCount: {
    type: Number,
    default: 0        
  },
    summary:{
        type:String,
        default:null
    }

},{
    timestamps:true
})

const DocModal=mongoose.model("document",DocumentSchema);

export default DocModal;
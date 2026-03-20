import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv'
import { generateEmbedding } from "../../services/generateEmbeddings.js"
import { queryChunks } from "../../services/storeEmbeddings.js"
import ChatModel from "../../modals/AiChatModal.js"

dotenv.config()

const getAIResponse = async (userQuery, docid, userid) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const queryEmbedding = await generateEmbedding(userQuery)

  const context = await queryChunks(queryEmbedding, docid, 5)

  const history = await ChatModel.find({
    userId: userid,                         
    docid: docid
  }).sort({ createdAt: 1 }).limit(8)        

  
  const contextText = context.join('\n\n')   
  const historyText = history
    .map(h => `${h.role}: ${h.message}`)
    .join('\n')                              

  const prompt = `
    You are a document chatbot.
    Your work is to answer user queries based on the context provided.
    Answer must be precise and relevant to the topic.
    If user queries out of topic "I can answer related to document".
    if any greeting greet accordingly

    Context:
    ${contextText}

    Chat History:
    ${historyText}

    User Question: ${userQuery}
  `

  const result = await model.generateContent(prompt)
  return result.response.text()
}

export const chat = async (req, res, next) => {
  try {
    const userid = req.user.id             
    const docid = req.params.id
    const { userQuery } = req.body

    if (!userQuery || userQuery.trim() === '') {
      return res.status(400).json({          
        statusCode: 400,
        success: false,
        message: "Please enter your query"
      })
    }

    await ChatModel.create({
      userid: userid,
      docid,
      role: 'user',
      message: userQuery
    })

    const result = await getAIResponse(userQuery, docid, userid)

    await ChatModel.create({
      userid: userid,
      docid,
      role: 'assistant',
      message: result
    })

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Response fetched successfully",
      data: {
        role: "assistant",
        response: result
      }
    })

  } catch (err) {
    next(err)
  }
}

export const AiChatHistory = async(req,res,next)=>{

try{
    
    const userid=req.user.id;
    const docid=req.params.id;

    const history= await ChatModel.find({userid:userid, docid:docid}).sort({ createdAt: 1 });
    
    return res.status(200).json({
        statusCode:200,
        success:true,
        message:"Chat history fetched successfully",
        data:{
            history
        }
    })


}catch(err){
    next(err);
}

}
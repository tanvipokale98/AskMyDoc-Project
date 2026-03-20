import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
export const generateSummary =async (text)=>{

    try{
 const prompt = `
  The below given text is the content of the document:
 ${text}

 You are a document Summarizer you have to consider this text and give summary based on the topic.
 Summary should be precise and covering all the points related to the topic.
  `;
  
  const result = await model.generateContent(prompt);
    return result.response.text();
    }catch(err){
        throw err;
    }

}
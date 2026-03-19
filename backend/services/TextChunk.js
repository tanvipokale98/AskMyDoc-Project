import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const textChunker = async (text) =>{
    try{
         const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 300})
const texts = await splitter.splitText(text);
return texts;
    }catch(err){
        console.error(err);
        throw err;
    }
}



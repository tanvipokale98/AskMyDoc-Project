import { PDFParse } from 'pdf-parse';         
import fs from 'fs'
export const extractText = async (filePath) => {  
  try {
    const dataBuffer = fs.readFileSync(filePath)
    const data = new PDFParse(new Uint8Array(dataBuffer))
    const texts=await data.getText();
    return { text: texts.text, numPgs: texts.numpages, info: texts.info }
  } catch (err) {
    console.error(err)
    throw err  ;
  }
}
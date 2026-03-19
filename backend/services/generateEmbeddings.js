
import { pipeline } from '@huggingface/transformers';
let embedder = null;
async function getEmbedder() {
  if (!embedder) {
    console.log("Loading Hugging Face embedding model (first time only, may take a while)...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

export const generateEmbedding = async (text) => {
  try {
    const model = await getEmbedder()
    const output = await model(text, { pooling: "mean", normalize: true })
    return Array.from(output.data)
  } catch (err) {
    console.error('Embedding generation failed:', err)
    throw err  
  }
}

export const generateEmbeddings = async (chunks) => {
  try {
    const embeddings = []
    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk)
      embeddings.push(embedding)
    }
    return embeddings
  } catch (err) {
    console.error('Embeddings generation failed:', err)
    throw err
  }
}
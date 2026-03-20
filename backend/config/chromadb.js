import { ChromaClient } from "chromadb"

const client = new ChromaClient({
  path: "http://localhost:8000"
});

const getCollection = async () => {
  const collection = await client.getOrCreateCollection({
    name: "documents",         
    metadata: {
      "hnsw:space": "cosine"  
    }
  })
  return collection;
}

export default getCollection;


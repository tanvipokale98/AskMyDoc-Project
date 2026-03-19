import { ChromaClient } from "chromadb"

const client = new ChromaClient({
  path: "http://localhost:8000"
});

const getCollection = async () => {
  const collection = await client.getOrCreateCollection({
    name: "documents",         // collection name
    metadata: {
      "hnsw:space": "cosine"  // cosine similarity — best for text
    }
  })
  return collection;
}

export default getCollection;


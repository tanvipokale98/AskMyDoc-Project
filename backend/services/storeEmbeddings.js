import getCollection from "../config/chromadb.js"

export const storeChunks = async (documentId, chunks, embeddings) => {

  try{
    const collection = await getCollection()

  await collection.add({
    ids: chunks.map((_, i) => `${documentId}_chunk_${i}`),
    //  unique id for each chunk

    documents: chunks,
    // the actual text chunks (string array)

    embeddings: embeddings,
    // array of vectors (number[][] )

    metadatas: chunks.map((_, i) => ({
      documentId: documentId.toString(),
      chunkIndex: i
    }))
    // metadata so you know which doc each chunk belongs to
  })

  console.log(`Stored ${chunks.length} chunks for document ${documentId}`)
  }catch(err){
    console.error(err);
    throw err;
  }
  
}

export const queryChunks = async (questionEmbedding, documentId, topK = 4) => {
  try{
 const collection = await getCollection()

  const results = await collection.query({
    queryEmbeddings: [questionEmbedding],
    // embed the user's question and pass here

    nResults: topK,
    // get top 4 most similar chunks

    where: { documentId: documentId.toString() }
    // only search chunks from this specific document
  })

  return results.documents[0]
  // returns array of the most relevant chunk strings
  }catch(err){
    console.log(err);
    throw err;
  }
 
}
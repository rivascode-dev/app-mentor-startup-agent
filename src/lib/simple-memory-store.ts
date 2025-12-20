
import { VectorStore } from "@langchain/core/vectorstores";
import { Embeddings } from "@langchain/core/embeddings";
import { Document } from "@langchain/core/documents";

interface VectorEntry {
  vector: number[];
  document: Document;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export class SimpleMemoryVectorStore extends VectorStore {
  memoryVectors: VectorEntry[] = [];

  constructor(embeddings: Embeddings) {
    super(embeddings, {});
  }

  _vectorstoreType(): string {
    return "simple_memory";
  }

  async addDocuments(documents: Document[]): Promise<void> {
    const texts = documents.map(({ pageContent }) => pageContent);
    const embeddings = await this.embeddings.embedDocuments(texts);
    await this.addVectors(embeddings, documents);
  }

  async addVectors(vectors: number[][], documents: Document[]): Promise<void> {
    for (let i = 0; i < vectors.length; i++) {
      this.memoryVectors.push({
        vector: vectors[i],
        document: documents[i],
      });
    }
  }

  async similaritySearchVectorWithScore(
    query: number[],
    k: number
  ): Promise<[Document, number][]> {
    const searches = this.memoryVectors
      .map((entry) => ({
        similarity: cosineSimilarity(query, entry.vector),
        document: entry.document,
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, k);

    return searches.map((result) => [result.document, result.similarity]);
  }
  
  static async fromDocuments(
    docs: Document[],
    embeddings: Embeddings,
    dbConfig?: any
  ): Promise<SimpleMemoryVectorStore> {
    const instance = new SimpleMemoryVectorStore(embeddings);
    await instance.addDocuments(docs);
    return instance;
  }
}

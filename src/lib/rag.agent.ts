import { ChatOpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from "@langchain/openai";
import { SimpleMemoryVectorStore } from "./simple-memory-store";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemorySaver } from '@langchain/langgraph';
import * as z from "zod";
import { tool } from "@langchain/core/tools";
import { SystemMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Document } from "@langchain/core/documents";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Singleton to avoid re-initializing on every request
let agentInstance: any = null;

export const getAgent = async () => {
  if (agentInstance) {
    return agentInstance;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  
  // const model = new ChatOpenAI({
  //   model: process.env.OPENAI_MODEL ?? 'gpt-4o',
  //   temperature: parseFloat(process.env.OPENAI_TEMPERATURE ?? '0'),
  //   apiKey,
  // });
  
  
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash", 
    apiKey: process.env.GOOGLE_API_KEY, 
    maxOutputTokens: 2048,
  });

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
    //apiKey,
  });

  // Load documents
  const urls = [
    "https://paulgraham.es/ensayos/startup-crecimiento.html",
    "https://paulgraham.es/ensayos/ideas-organicas-para-startups.html",
    "https://paulgraham.es/ensayos/los-18-errores-que-matan-a-las-startups.html",
    "https://paulgraham.es/ensayos/como-son-en-realidad-las-startups.html",
    "https://www.chileatiende.gob.cl/fichas/53234-creacion-de-empresas-en-un-dia",
    "https://www.bcn.cl/portal/leyfacil/recurso/estatuto-de-las-pymes",
    "https://www.sii.cl/siieduca/aprende-con-nosotros/inicio-de-actividades-y-formalizacion-de-un-negocio.html",
    "https://www.inapi.cl/portal/institucional/600/w3-article-578.html",
  ];

  const pTagSelector = "p";
  const docs: Document[] = [];

  for (const url of urls) {
    const loader = new CheerioWebBaseLoader(url, {
      selector: pTagSelector,
    });
    const loadedDocs = await loader.load();
    docs.push(...loadedDocs);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const allSplits = await splitter.splitDocuments(docs);
  
  const vectorStore = await SimpleMemoryVectorStore.fromDocuments(allSplits, embeddings);

  const retrieveSchema = z.object({ query: z.string() });




  const retrieve = tool(
    async ({ query }: { query: string }) => {
      const retrievedDocs = await vectorStore.similaritySearch(query, 2);
      const serialized = retrievedDocs
        .map(
          (doc: Document) => `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`
        )
        .join("\n");
      return serialized;
    },
    {
      name: "retrieve",
      description: "Retrieve information related to a query.",
      schema: retrieveSchema,
    }
  );

  const tools = [retrieve];
  const systemPrompt = new SystemMessage(
      "Tienes acceso a una herramienta (RAG Agent) que recupera el contexto de una publicación de blog. " +
      "Usa la herramienta para ayudar a responder las consultas del usuario." +
      "Si no tienes la respuesta en el contexto, responde que solo tienes acceso a la información del contexto. Y responde que no tienes la respuesta disponible."
  );

  const checkpointer = new MemorySaver();

  agentInstance = createReactAgent({ 
    llm: model, 
    tools, 
    messageModifier: systemPrompt, 
    checkpointSaver: checkpointer 
  });
  
  return agentInstance;
};

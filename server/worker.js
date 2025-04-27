import { Worker } from 'bullmq';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import dotenv from 'dotenv';
dotenv.config(); // to load .env variables

const worker = new Worker('file-upload-queue', async (job) => {
    console.log('Processing job:', job.data);

    const data = job.data;

    console.log('Loading PDF file:', data.path);
    const loader = new PDFLoader(data.path);
    const docs = await loader.load();
    console.log('Number of documents:', docs.length);

    // split into smaller documents
    const splitter = new CharacterTextSplitter({
        separator: '\n',
        chunkSize: 500,
        chunkOverlap: 50,
    });
    const splittedDocs = await splitter.splitDocuments(docs);

    const embeddings = new OpenAIEmbeddings({
        model: 'text-embedding-3-small',
        apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorstore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: 'http://localhost:6333',
            collectionName: 'pdf-rag',
        }
    );

    await vectorstore.addDocuments(splittedDocs);
    console.log('All documents added to vector store!');
}, 
{
    concurrency: 100,
    connection: { 
        host: 'localhost',
        port: 6379,
    },
});

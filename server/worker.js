import { Worker } from 'bullmq';

const worker = new Worker('file-upload-queue', async job => {
    console.log('Processing job:', job.data);
    const data = JSON.parse(job.data);
    // path: data.path
    // read the pdf from the path
    // chunk the pdf
    // call the openai embedding model for every chunk,
    // stire the chunk in qdrant db
},
{ 
    connection: {
        host: 'localhost',
        port: 6379,
    },
    concurrency: 100, // number of jobs to process at a time
}
);
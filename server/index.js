import express from 'express';
import cors from 'cors';// used to allow cross-origin requests
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,`${uniqueSuffix}-${file.originalname}`); // file name is the name of the file in the request
    }
})

const upload = multer({ storage: storage })// multer is used to handle file uploads

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) =>{
    return res.json({status: 'ok'})
})

app.post('/upload/pdf',upload.single('pdf'), (req, res) => { // here the /upload/pdf is the endpoint to which the file is uploaded and pdf is the name of the file in the request i missed / so it was not working 
    return res.json({ message: 'uploaded successfully', file: req.file })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
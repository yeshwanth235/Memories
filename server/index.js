import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(cors());


dotenv.config()

//mongodb connection


const port = process.env.PORT || 5500;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    }))
    .catch((error) => console.log(error))
mongoose.Promise = global.Promise;
// mongoose.set('useFindAndModify', false); 

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})

app.use('/postsinfo', postRoutes)
import express from 'express';
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
import router from './routes/product.route.js';
import cors from 'cors'
import path from 'path'


const app = express();
dotenv.config()
const port = process.env.PORT || 3000

const __dirname = path.resolve()



app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())



app.use('/api/products/',router)

app.use(express.static(path.join(__dirname, '/my/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, "my","dist","index.html"))

})

app.listen(port,()=>{
    connectDb();
})
import express from "express"
import mongoose from "mongoose"
import financialRecordRouter from './routes/financial-records.js'
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors())

const mongoURI = process.env.MONGO_URI


mongoose
    .connect(mongoURI)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.error("Failed to connect :", err));


app.use("/financial-records",financialRecordRouter)
    
app.listen(port,()=>{
    console.log(`app listning on port ${port}`)
})

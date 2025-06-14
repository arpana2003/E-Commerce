import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import {config} from 'dotenv'
config()
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import itemRoute from "./routes/itemRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))
app.use(cookieParser());

app.use(morgan('dev'))

app.use('/ping', (req,res)=>{
    res.send('Pong');
})

app.use('/api/v1/user',userRoute)
app.use('/api/v1/items',itemRoute)
app.use('/api/v1/payments',paymentRoute)

app.all('*', (req , res)=>{
    res.status(404).send('Hello BRO')
})

app.use(errorMiddleware);

export default app; 
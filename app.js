import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbconnection } from "./database/dbconnection.js";
import { ErrorMiddleware } from './error/error.js';
import reservationRouter from './routes/reservationRoute.js'
const app=express();
dotenv.config({path:"./config/config.env"})
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST"],
    credentials:true,
}))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Backend is running successfully ✅');
});
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/reservation",reservationRouter)
dbconnection();
app.use(ErrorMiddleware)
export default app;
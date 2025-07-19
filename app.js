import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbconnection } from "./database/dbconnection.js";
import { ErrorMiddleware } from './error/error.js';
import reservationRouter from './routes/reservationRoute.js';

const app = express();
dotenv.config({ path: "./config/config.env" });

// ✅ Temporary open CORS fix — works for development
app.use(cors({
  origin: "https://resturant-web-app-frontend.vercel.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

// ✅ Logs to confirm CORS applied
app.use((req, res, next) => {
  console.log("Request origin:", req.headers.origin);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1/reservation", reservationRouter);

// ✅ Home test route
app.get('/', (req, res) => {
  res.send('Backend is running successfully ✅');
});

// ✅ DB and error
dbconnection();
app.use(ErrorMiddleware);

<<<<<<< HEAD
export default app;
=======
export default app;
>>>>>>> fef0de9 (Add email confirmation with nodemailer)

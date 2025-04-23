import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes.js";
import registerBlog from "../routes/blog.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express(); //inicializa app


const corsOptions = {
  origin: [
    'https://react-coach.vercel.app', // URL exacta de tu frontend
    'http://localhost:3000' // Para desarrollo
  ],
  credentials: true,
  optionsSuccessStatus: 200 // Para navegadores antiguos
};
app.use(cors(corsOptions));

// Opcional: Configuración manual de headers (si necesitas más control)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://react-coach.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", registerBlog);

export default app; //ahora exportalo

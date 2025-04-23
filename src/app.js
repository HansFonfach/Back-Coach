import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes.js";
import registerBlog from "../routes/blog.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express(); //inicializa app


app.use(cors({
  origin: 'https://react-coach.vercel.app', // Reemplaza con tu URL de Vercel
  credentials: true
}));

// Opcional: Configuración manual de headers (si necesitas más control)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://react-coach.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", registerBlog);

export default app; //ahora exportalo

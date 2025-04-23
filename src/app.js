import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes.js";
import registerBlog from "../routes/blog.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express(); //inicializa app


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // Habilita CORS para todos los orígenes
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", registerBlog);

export default app; //ahora exportalo

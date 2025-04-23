import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    // Eliminando las opciones obsoletas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a la BD");
  } catch (error) {
    console.error("Error al conectar a la BD:", error.message);
  }
};

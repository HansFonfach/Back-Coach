import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    respuestas: [
      {
        nombre: { type: String, default: "Admin" }, // Opcional: hardcodeas "Admin" o lo dejas dinámico
        mensaje: { type: String, required: true },
        esAdmin: { type: Boolean, default: true }, // Marca respuestas oficiales
        fecha: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },

    cuerpo: {
      type: String,
      required: true,
    },
    imagen: Buffer,
    mimeType: String,
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    comentarios: [comentarioSchema], // Array de comentarios
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);

  import bcrypt from "bcryptjs";
  import jwt from "jsonwebtoken";
  import User from "../models/user.model.js";

  export const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
      const user = await User.findOne({ correo });
      if (!user) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      // 1. Generar token con role incluido
      const token = jwt.sign(
        { id: user._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .cookie("token", token, {
          httpOnly: true, // Seguridad: el front no puede leerla con JS
          secure: process.env.NODE_ENV === "production", // HTTPS en producción
          sameSite: "strict", // Previene CSRF
          maxAge: 3600000, // 1 hora (igual que expiresIn del token)
        })
        .json({
          token,
          user: {
            id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            role: "admin",
          },
        });
    } catch (error) {
      console.error("Error en el login:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  };

  export const verifyToken = async (req, res) => {
    // Opción 1: Si usas headers
    const token = req.cookies.token;

    // Opción 2: Si usas cookies
    // const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userFound = await User.findById(decoded.id);

      if (!userFound) {
        return res.status(401).json({ message: "No autorizado" });
      }

      return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        role: decoded.role, // Usar el role del token
      });
    } catch (error) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };

  export const logout = (req, res) => {
    res.clearCookie("token").json({ message: "Sesión cerrada" });
  };
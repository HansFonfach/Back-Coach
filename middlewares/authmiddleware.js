import jwt from "jsonwebtoken"; // ¡Esta línea falta en tu archivo!

export const authMiddleware = (req, res, next) => {
    // Extrae el token de las cookies (como en tu validateToken)
    const token = req.cookies.token; // Asegúrate de que la cookie se llame "token"
  
    if (!token) {
      return res.status(401).json({ message: "No hay token en las cookies" });
    }
  
    console.log("TOKEN RECIBIDO (Cookies):", token); // Debug
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, role }
      next();
    } catch (error) {
      console.error("Error al verificar el token:", error); // Debug detallado
      return res.status(401).json({ message: "Token inválido (¿Secret correcto/Token expirado?)" });
    }
  };
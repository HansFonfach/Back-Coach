  import jwt from "jsonwebtoken";

  export const validateToken = (req, res, next) => {
    // 1. Obtener el cookie completo
    const cookie = req.headers.cookie;

    // 2. Extraer solo el token JWT (ejemplo: si el cookie es "token=TU_JWT;")
    const token = cookie?.split("token=")[1]?.split(";")[0];

    if (!token) return res.status(401).json({ message: "Acceso denegado" });

    try {
      // 3. Verificar el token (¡ahora sí es válido!)
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      console.error("Error al verificar el token:", err);
      res.status(400).json({ message: "Token inválido" });
    }
  };

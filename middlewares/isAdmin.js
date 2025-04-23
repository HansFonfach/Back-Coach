export const isAdminMiddleware = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send("Acceso denegado: se requiere admin");
  }
  next();
};
import { Router } from "express";
import {
  getBlog,
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getPublicBlogs,
  getPublicBlog,
  comentBlog,
  comentAdmin,
} from "../controllers/blog.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import { sendEmail } from "../controllers/emailController.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/addblog", validateToken, upload.single('imagen'), createBlog);
router.get("/blogs/public", getPublicBlogs);
router.get("/blogs/blog/:id", getPublicBlog);
router.get("/blogs", validateToken, getBlogs);
router.get("/blogs/:id", validateToken, getBlog);
router.delete("/blogs/:id", validateToken, deleteBlog);
router.put("/blogs/:id", validateToken, updateBlog);
router.post("/blogs/:id/comentarios", comentBlog);
router.post("/blogs/:blogId/comentarios/:commentId/respuestas", authMiddleware, isAdminMiddleware,  comentAdmin)
router.post("/email/send", sendEmail)



export default router;

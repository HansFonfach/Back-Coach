import Blog from "../models/blog.model.js";

export const createBlog = async (req, res) => {
  const { titulo, cuerpo, fecha } = req.body;

  if (!req.file) {
    // Verifica si hay archivo
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }

  try {
    const newBlog = new Blog({
      titulo,
      cuerpo,
      imagen: req.file.buffer, // Ahora req.file existe
      mimeType: req.file.mimetype,
      autor: req.user.id,
      fecha,
    });

    const blogSaved = await newBlog.save();
    res.json(blogSaved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el blog" });
  }
};

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate("autor");

  res.json(blogs);
};
export const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog no encontrado" });
  res.json(blog);
};
export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog no encontrado" });
  res.json(blog);
};
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id, req.body, {
    new: true, //esto es para que no me muestre el dato viejo, si no que el nuevo
  });
  if (!blog) return res.status(404).json({ message: "Blog no encontrado" });
  res.json(blog);
};

export const getPublicBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("autor")
      .select("-contenidoPrivado");

    const blogsConImagen = blogs.map((blog) => {
      let imagenDataURL = null;
      if (blog.imagen && Buffer.isBuffer(blog.imagen)) {
        imagenDataURL = `data:${blog.mimeType};base64,${blog.imagen.toString(
          "base64"
        )}`;
      }

      return {
        ...blog._doc,
        imagen: imagenDataURL,
      };
    });

    res.json(blogsConImagen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublicBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog no encontrado" });
    }

    // Convertir Buffer a Base64 solo si existe la imagen
    let imagenDataURL = null;
    if (blog.imagen && Buffer.isBuffer(blog.imagen)) {
      imagenDataURL = `data:${blog.mimeType};base64,${blog.imagen.toString(
        "base64"
      )}`;
    }

    res.json({
      ...blog._doc,
      imagen: imagenDataURL, // Envía la imagen como data URL o null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const comentBlog = async (req, res) => {
  const { nombre, mensaje } = req.body;
  const comentario = { nombre, mensaje, fecha: new Date() };

  try {
    await Blog.findByIdAndUpdate(req.params.id, {
      $push: { comentarios: comentario },
    });
    res.status(200).json({ mensaje: comentario.mensaje });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el comentario" });
  }
};

export const comentAdmin = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { mensaje } = req.body;

  await Blog.updateOne(
    { _id: blogId, "comentarios._id": commentId }, //busca el blog con ese id y el comentario con el id
    {
      $push: {
        "comentarios.$.respuestas": {
          // "comentarios.$" es el comentario encontrado
          nombre: "Jaime Rojas",
          mensaje: mensaje,
          esAdmin: true,
          fecha: new Date(),
        },
      },
    }
  );
  res.status(200).send("Respuesta agregada");
  console.log(mensaje);
};

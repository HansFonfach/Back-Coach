import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(), // Almacena el archivo en memoria como Buffer
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});


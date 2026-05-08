import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Keep files in memory — we stream them straight to Cloudinary
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|pdf/i;
    cb(null, allowed.test(file.mimetype));
  },
});

export const streamToCloudinary = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'rhc-portfolio', resource_type: 'auto', ...options },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

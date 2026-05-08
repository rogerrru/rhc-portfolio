import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rhc-portfolio',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

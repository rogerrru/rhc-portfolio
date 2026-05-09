import { Router } from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../services/cloudinaryService.js';

const router = Router();

router.get('/', (_req, res) => {
  const cloudinaryConfigured = !!process.env.CLOUDINARY_URL;
  res.json({ endpoint: 'POST /api/upload', cloudinaryConfigured });
});
router.post('/', requireAuth, upload.single('file'), uploadImage);
router.delete('/', requireAuth, deleteImage);

export default router;

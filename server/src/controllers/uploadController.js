import cloudinary from '../config/cloudinary.js';
import { streamToCloudinary } from '../services/cloudinaryService.js';

export const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const result = await streamToCloudinary(req.file.buffer);
  res.json({ url: result.secure_url, publicId: result.public_id });
};

export const deleteImage = async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) return res.status(400).json({ error: 'publicId is required' });
  await cloudinary.uploader.destroy(publicId);
  res.json({ message: 'Image deleted' });
};

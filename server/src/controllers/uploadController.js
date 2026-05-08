import cloudinary from '../config/cloudinary.js';

export const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // multer-storage-cloudinary attaches the Cloudinary response to req.file
  res.json({
    url: req.file.path,
    publicId: req.file.filename,
  });
};

export const deleteImage = async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) return res.status(400).json({ error: 'publicId is required' });
  await cloudinary.uploader.destroy(publicId);
  res.json({ message: 'Image deleted' });
};

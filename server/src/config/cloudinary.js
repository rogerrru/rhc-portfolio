import { v2 as cloudinary } from 'cloudinary';

// The SDK automatically reads CLOUDINARY_URL from the environment.
// Format: cloudinary://api_key:api_secret@cloud_name
cloudinary.config({ secure: true });

export default cloudinary;

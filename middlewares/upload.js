import multer from "multer";

import cloudinary from "cloudinary";

import { CloudinaryStorage } from "multer-storage-cloudinary";

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  api_key: CLOUDINARY_KEY,
  cloud_name: CLOUDINARY_NAME,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  folder: "avatars",
  cloudinary: cloudinary,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;

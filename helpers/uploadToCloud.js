import cloudinary from "cloudinary";
const { v2 } = cloudinary;

const uploadToCloud = async (req) => {
  const { _id } = req.user;
  const filePath = req.file.path;
  const uniqueFilename = `${_id}_avatar`;

  const options = {
    public_id: `task-pro/avatars/${uniqueFilename}`,
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [{ width: 128, height: 128, crop: "fill" }],
    quality: "auto:best",
  };
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return result.secure_url;
  } catch (error) {
    error.message = "Image processing error";
    return error;
  }
};

export default uploadToCloud;

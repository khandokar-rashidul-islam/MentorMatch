import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Send buffer to Cloudinary
export const sendImageToCloudinary = async (
  imageName: string,
  buffer: Buffer
): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { public_id: imageName.trim() },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));
        resolve({
          secure_url: result.secure_url as string,
          public_id: result.public_id as string,
        });
      }
    );
    stream.end(buffer);
  });
};

// Memory storage (no temp files on disk)
export const upload = multer({ storage: multer.memoryStorage() });

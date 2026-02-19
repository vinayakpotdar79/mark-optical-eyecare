import "dotenv/config";

const _ENV = {
  PORT: process.env.PORT,
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};

export const ENV = Object.freeze(_ENV);

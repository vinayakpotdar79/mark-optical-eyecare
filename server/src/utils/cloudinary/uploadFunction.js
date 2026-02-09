import cloudinary from "./cloudinary.js";

const uploadToCloudinary = (fileBuffer, folderPath) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderPath },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );

    stream.end(fileBuffer);
  });
};

export default uploadToCloudinary;

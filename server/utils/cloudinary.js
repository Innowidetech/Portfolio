const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "image",
  access_mode: 'public',
};

exports.uploadImage = async (files) => {
  try {
    if (!Array.isArray(files)) {
      files = [files];
    }
    const uploadedFiles = await Promise.all(
      files.map((file) =>
        new Promise((resolve, reject) => {
          if (!file.mimetype.startsWith('image/')) {
            return reject(new Error('Only image files are allowed.'));
          }
          const uploadOptions = { ...opts, resource_type: "image" };
          cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error) return reject(new Error(error.message));
            if (result && result.secure_url) {
              return resolve(result.secure_url);
            }
          }).end(file.buffer);
        })
      )
    );
    return uploadedFiles;
  } catch (error) {
    throw new Error(error.message);
  }
};

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import DatauriParser from "datauri/parser";
const parser = new DatauriParser();

dotenv.config();

export const storage = multer.memoryStorage();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = (file) =>
    new Promise((resolve, reject) => {
        const data = parser.format(
            path.extname(file.originalname).toString(),
            file.buffer
        );
        cloudinary.uploader.upload(
            data.content, { resource_type: "auto" },
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            }
        );
    });
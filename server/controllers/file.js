import { upload } from "../utils/upload";

export const fileUploads = async(req, res, next) => {
    try {
        const file = req.file;
        const result = await upload(file);
        res.json({ data: result.secure_url });
    } catch (error) {
        next(error);
    }
};
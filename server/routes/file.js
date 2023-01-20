import { Router } from "express";
import multer from "multer";
import { storage, uploads } from "../utils/upload";
import { fileUploads } from "../controllers/file";

const fileRouter = (router) => {
    router.post("/upload", multer({ storage }).single("image"), fileUploads);

    return router;
};

export default fileRouter;
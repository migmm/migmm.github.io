import express from "express";
import upload from "../middlewares/multer";
import { getImage, getImages, uploadImages, deleteImage, getImagesPresignedURL } from "../controller/aws";

const router = express.Router();

router.get("/", getImages);
router.get("/url",getImagesPresignedURL);
router.get("/url/:id", getImage);
router.post("/", upload.array("images", 10), uploadImages);
router.delete("/:id", deleteImage);

export default router;

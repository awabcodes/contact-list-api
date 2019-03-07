import { Router } from "express";
import ContactController from "../controllers/contact";

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "contact-images",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

router.get("/", ContactController.getAllContacts);

router.get("/:contactId", ContactController.getContact);

router.post("/", ContactController.createContact);

router.delete("/:contactId", ContactController.deleteContact);

router.get("/search/:query", ContactController.searchContacts);

router.get("/report/csv", ContactController.exportToCsv);

router.post(
  "/images/:contactId",
  parser.single("image"),
  ContactController.uploadImage
);

router.get("/images/:contactId", ContactController.getImage);

export default router;

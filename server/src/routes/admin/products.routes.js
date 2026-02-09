import { Router } from "express";
import { createProduct } from "../../controllers/admin/products.controller.js";
import upload from "../../middlewares/multer.js";

const router = Router();

router.post("/products", upload.array("images", 5), createProduct);

export default router;

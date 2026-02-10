import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getAllProducts,
} from "../../controllers/admin/products.controller.js";
import upload from "../../middlewares/multer.js";

const router = Router();

router.post("/products", upload.array("images", 5), createProduct);
router.get("/products/:slug", getProductBySlug);
router.get("/products", getAllProducts);
router.delete("/products/:slug", deleteProduct);

export default router;

import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getAllProducts,
  updateProduct,
} from "../../controllers/admin/products.controller.js";
import upload from "../../middlewares/multer.js";

const router = Router();

router.post("/", upload.array("images", 5), createProduct);
router.patch("/:slug", upload.array("images", 5), updateProduct);
router.get("/:slug", getProductBySlug);
router.get("/", getAllProducts);
router.delete("/:slug", deleteProduct);

export default router;

import { Router } from "express";
import {
  getProductBySlug,
  getAllProducts,
} from "../../controllers/admin/products.controller.js";
const router = Router();

router.get("/:slug", getProductBySlug);
router.get("/", getAllProducts);

export default router;

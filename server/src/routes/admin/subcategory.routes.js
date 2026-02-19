import express from "express";
import {
  createSubCategory,
  getSubCategoriesByCategory,
} from "../../controllers/admin/subcategory.controller.js";

const router = express.Router();

router.post("/", createSubCategory);
router.get("/subcategories", getSubCategoriesByCategory);

export default router;

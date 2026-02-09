import express from "express";
import {
  createSubCategory,
  getSubCategoriesByCategory,
} from "../../controllers/admin/subcategory.controller.js";

const router = express.Router();

router.post("/subcategory", createSubCategory);
router.get("/subcategories", getSubCategoriesByCategory);

export default router;

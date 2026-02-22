import express from "express";
import {
  getSubCategoriesByCategory,
} from "../../controllers/admin/subcategory.controller.js";

const router = express.Router();

router.get("/subcategories", getSubCategoriesByCategory);

export default router;

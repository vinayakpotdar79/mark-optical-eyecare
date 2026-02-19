import express from "express";
import {
  createCategory,
  getCategories,
} from "../../controllers/admin/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/categories", getCategories);

export default router;

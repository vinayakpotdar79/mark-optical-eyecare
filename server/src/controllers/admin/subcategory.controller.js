import SubCategory from "../../models/SubCategory.js";
import Category from "../../models/Category.js";
import redis from "../../redis/config.js";
import { categoryKeys } from "../../utils/cacheKeys.js";

export const createSubCategory = async (req, res) => {
  try {
    const { categoryName, subCategoryName } = req.body;

    if (!categoryName || !subCategoryName) {
      return res
        .status(400)
        .json({ message: "Category name and subcategory name are required" });
    }

    const category = await Category.findOne({
      name: new RegExp(`^${categoryName}$`, "i"),
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const slug = subCategoryName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    const exists = await SubCategory.findOne({
      slug,
      category: category._id,
    });

    if (exists) {
      return res
        .status(409)
        .json({ message: "Subcategory already exists in this category" });
    }

    const subCategory = await SubCategory.create({
      name: subCategoryName,
      slug,
      category: category._id,
    });

    //delete all subcategories of cache on create subcategory
    await redis.del(categoryKeys.subCategories(category._id));

    res.status(201).json({ success: true, subCategory });
  } catch (err) {
    res.status(500).json({ message: "Failed to create subcategory" });
  }
};

export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is required" });
    }
    const cachedSubCategories = await redis.get(categoryKeys.subCategories(categoryId));
    if (cachedSubCategories) {
      console.log("⚡ subcategories fetched from cache");
      return res.json(JSON.parse(cachedSubCategories));
    }
    const subCategories = await SubCategory.find(
      { category: categoryId },
      "_id name slug",
    );
    console.log("🐢 subcategories fetched from database");
    await redis.setex(categoryKeys.subCategories(categoryId), 60 * 60, JSON.stringify(subCategories));
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subcategories" });
  }
};

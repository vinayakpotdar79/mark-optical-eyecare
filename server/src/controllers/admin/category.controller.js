import Category from "../../models/Category.js";
import redis from "../../redis/config.js";
import { categoryKeys } from "../../utils/cacheKeys.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    const exists = await Category.findOne({ slug });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, slug });

    //delete all categories of cache on create category
    await redis.del(categoryKeys.all);

    res.status(201).json({ success: true, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const getCategories = async (_, res) => {
  try {
    const categories = await Category.find({}, "_id name slug");
    const cacheCategories = await redis.get(categoryKeys.all);
    if (cacheCategories) {
      console.log("⚡ Categories fetched from cache");
      return res.json(JSON.parse(cacheCategories));
    }
    console.log("🐢 Categories fetched from database");
    await redis.setex(categoryKeys.all, 60 * 60, JSON.stringify(categories));
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

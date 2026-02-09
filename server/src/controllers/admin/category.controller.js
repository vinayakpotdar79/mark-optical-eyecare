import Category from "../../models/Category.js";

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

    res.status(201).json({ success: true, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const getCategories = async (_, res) => {
  try {
    const categories = await Category.find({}, "_id name slug");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

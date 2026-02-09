import SubCategory from "../../models/SubCategory.js";
import Category from "../../models/Category.js";
import Product from "../../models/Products.js";
import uploadToCloudinary from "../../utils/cloudinary/uploadFunction.js";
import cloudinary from "../../utils/cloudinary/cloudinary.js";

export const createProduct = async (req, res) => {
  const uploadPublicIds = [];

  try {
    const { name, price, description, categoryName, subCategoryName } =
      req.body;

    if (!name || !price || !categoryName || !subCategoryName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const category = await Category.findOne({
      name: new RegExp(`^${categoryName}$`, "i"),
    });

    if (!category) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const subCategory = await SubCategory.findOne({
      name: new RegExp(`^${subCategoryName}$`, "i"),
      category: category._id,
    });

    if (!subCategory) {
      return res.status(400).json({ message: "Invalid  subcategory" });
    }

    const productSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    const folderPath = `optical-store/${category.slug}/${subCategory.slug}/${productSlug}`;

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, folderPath),
    );

    const uploadResults = await Promise.all(uploadPromises);

    const images = uploadResults.map((result) => {
      uploadPublicIds.push(result.public_id);

      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    });

    const product = await Product.create({
      name,
      slug: productSlug,
      description,
      price,
      category: category._id,
      subCategory: subCategory._id,
      images,
      isActive: true,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("Error in createProduct", err);

    if (uploadPublicIds.length > 0) {
      await Promise.all(
        uploadPublicIds.map((id) => cloudinary.uploader.destroy(id)),
      );
    }
    res.status(500).json({ message: err.message || "Product creation failed" });
  }
};

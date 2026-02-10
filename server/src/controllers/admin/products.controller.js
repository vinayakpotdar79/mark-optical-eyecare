import SubCategory from "../../models/SubCategory.js";
import Category from "../../models/Category.js";
import Product from "../../models/Products.js";
import uploadToCloudinary from "../../utils/cloudinary/uploadFunction.js";
import cloudinary from "../../utils/cloudinary/cloudinary.js";

export const createProduct = async (req, res) => {
  const uploadPublicIds = [];

  try {
    const { name, price, description, categoryName, stock, subCategoryName } =
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
      stock,
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

// get single product
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      slug,
      isActive: true,
    })
      .populate("category", "name slug")
      .populate("subCategory", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("category", "name slug")
      .populate("subCategory", "name slug");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
//delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Promise.all(
      product.images.map((img) => cloudinary.uploader.destroy(img.public_id)),
    );

    await product.deleteOne();

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Product deletion failed" });
  }
};

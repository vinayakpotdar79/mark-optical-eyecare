import SubCategory from "../../models/SubCategory.js";
import Category from "../../models/Category.js";
import Product from "../../models/Products.js";
import uploadToCloudinary from "../../utils/cloudinary/uploadFunction.js";
import cloudinary from "../../utils/cloudinary/cloudinary.js";
import redis from "../../redis/config.js";
import { productKeys } from "../../utils/cacheKeys.js";

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
    //delete all products of cache on create 
    await redis.del(productKeys.all);

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

    const cachedProduct = await redis.get(productKeys.byId(slug));

    if (cachedProduct) {
      console.log("⚡ Product fetched from cache");
      return res.json(JSON.parse(cachedProduct));
    }
    const product = await Product.findOne({
      slug,
      isActive: true,
    })
      .populate("category", "name slug")
      .populate("subCategory", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("🐢 Products fetched from database");
    await redis.setex(productKeys.byId(slug), 60 * 60, JSON.stringify(product));//expire in 1 hour
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const cachedProducts = await redis.get(productKeys.all);
    if (cachedProducts) {
      console.log("⚡ Products fetched from cache");
      return res.json(JSON.parse(cachedProducts));
    }
    const products = await Product.find({ isActive: true })
      .populate("category", "name slug")
      .populate("subCategory", "name slug");

    console.log("🐢 Products fetched from database");
    await redis.setex(productKeys.all, 60 * 60 * 24, JSON.stringify(products));//expire in 24 hours
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

    //delete all products of cache on delete product
    await redis.del(productKeys.all);
    await redis.del(productKeys.byId(slug));

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Product deletion failed" });
  }
};

export const updateProduct = async (req, res) => {
  const uploadedIds = [];

  try {
    const { slug } = req.params;
    const { name, price, description, categoryName, subCategoryName, stock } =
      req.body;

    const product = await Product.findOne({ slug });
    if (!product) return res.status(404).json({ message: "Product not found" });

    let category = product.category;
    let subCategory = product.subCategory;
    let categorySlug;
    let subCategorySlug;

    if (categoryName) {
      const cat = await Category.findOne({
        name: new RegExp(`^${categoryName}$`, "i"),
      });
      if (!cat) return res.status(400).json({ message: "Invalid category" });

      category = cat._id;
      categorySlug = cat.slug;
    } else {
      const cat = await Category.findById(product.category);
      categorySlug = cat.slug;
    }

    if (subCategoryName) {
      const sub = await SubCategory.findOne({
        name: new RegExp(`^${subCategoryName}$`, "i"),
        category,
      });
      if (!sub) return res.status(400).json({ message: "Invalid subcategory" });

      subCategory = sub._id;
      subCategorySlug = sub.slug;
    } else {
      const sub = await SubCategory.findById(product.subCategory);
      subCategorySlug = sub.slug;
    }

    let newImages = null;

    if (req.files && req.files.length > 0) {
      const newSlug = name
        ? name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
        : product.slug;

      const folderPath = `optical-store/${categorySlug}/${subCategorySlug}/${newSlug}`;

      const uploads = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, folderPath)),
      );

      newImages = uploads.map((r) => {
        uploadedIds.push(r.public_id);
        return { public_id: r.public_id, url: r.secure_url };
      });
    }

    if (name) {
      product.name = name;
      product.slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-");
    }

    if (price) product.price = price;
    if (description) product.description = description;
    if (stock !== undefined) product.stock = stock;

    product.category = category;
    product.subCategory = subCategory;

    if (newImages) {
      const oldImages = product.images;
      product.images = newImages;

      await product.save();

      // deleting old images after save success
      await Promise.all(
        oldImages.map((img) => cloudinary.uploader.destroy(img.public_id)),
      );
    } else {
      await product.save();
    }
    //delete all products of cache on update product
    await redis.del(productKeys.all);
    await redis.del(productKeys.byId(slug));

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);

    if (uploadedIds.length > 0) {
      await Promise.all(
        uploadedIds.map((id) => cloudinary.uploader.destroy(id)),
      );
    }

    res.status(500).json({ message: "Product update failed" });
  }
};

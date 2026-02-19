import { Router } from "express";
import productRoutes from "./products.routes.js";
import categoryRoute from "./category.routes.js";
import subcategoryRoute from "./subcategory.routes.js";

const adminRoutes = Router();

adminRoutes.use("/products", productRoutes);
adminRoutes.use("/category", categoryRoute);
adminRoutes.use("/subcategory", subcategoryRoute);

export default adminRoutes;

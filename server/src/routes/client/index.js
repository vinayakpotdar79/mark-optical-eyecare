import { Router } from "express";
import productRoutes from "./products.routes.js";
import categoryRoute from "./category.routes.js";
import subcategoryRoute from "./subcategory.routes.js";

const clientRoutes = Router();

clientRoutes.use("/products", productRoutes);
clientRoutes.use("/category", categoryRoute);
clientRoutes.use("/subcategory", subcategoryRoute);

export default clientRoutes;

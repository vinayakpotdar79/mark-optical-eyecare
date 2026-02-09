import express from "express";
import { connectDB } from "./src/utils/db.js";
import productsRoute from "./src/routes/admin/products.routes.js";
import categoryRoute from "./src/routes/admin/category.routes.js";
import subcategoryRoute from "./src/routes/admin/subcategory.routes.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use("/api/v1/admin", productsRoute);
app.use("/api/v1/admin", categoryRoute);
app.use("/api/v1/admin", subcategoryRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });

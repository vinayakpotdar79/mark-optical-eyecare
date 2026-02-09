import express from "express";
import { connectDB } from "./src/utils/db.js";
import productsRoute from "./src/routes/products.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use("/api/v1", productsRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });

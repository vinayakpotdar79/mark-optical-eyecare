import express from "express";
import { connectDB } from "./src/utils/db.js";
import redis from "./src/redis/config.js";
import adminRoutes from "./src/routes/admin/index.js";
import clientRoutes from "./src/routes/client/index.js";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(
  cors({
    allowedOrigins: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/client", clientRoutes);

app.get("/test", (_, res) => {
  res.status(200).json("Api working fine..");
});

redis.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redis.on('error', (err) => {
  console.log('❌ Redis connection error', err);
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // Mongo connection
import authRoutes from "./routes/authRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // allows JSON body parsing

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Subscription Management Dashboard API is running...");
});

// Error handling middleware (custom)
app.use(errorHandler);

// Port setup
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

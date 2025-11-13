import express from "express";
import Plan from "../models/Plan.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/plans - Public: list all plans
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/plans - Admin only: create a new plan
router.post("/", protect, admin, async (req, res) => {
  const { name, price, features, duration } = req.body;
  try {
    const plan = await Plan.create({ name, price, features, duration });
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

import express from "express";
import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/subscribe/:planId - subscribe to a plan
router.post("/subscribe/:planId", protect, async (req, res) => {
  const { planId } = req.params;
  const userId = req.user._id;

  try {
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Calculate end_date
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + plan.duration);

    // Create subscription
    const subscription = await Subscription.create({
      user: userId,
      plan: planId,
      start_date: startDate,
      end_date: endDate,
      status: "active",
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/my-subscription - get current user's subscription
router.get("/my-subscription", protect, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user._id })
      .populate("plan", "name price features duration")
      .sort({ start_date: -1 }); // get latest subscription

    if (!subscription)
      return res.status(404).json({ message: "No active subscription found" });

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/subscriptions - admin only: list all subscriptions
router.get("/admin/subscriptions", protect, admin, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({})
      .populate("user", "name email")
      .populate("plan", "name price features duration")
      .sort({ start_date: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

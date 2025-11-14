import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  subscribePlan,
  getMySubscription,
  getAllSubscriptions
} from "../controllers/subscriptionController.js";

const router = express.Router();

// POST /api/subscriptions/subscribe/:planId
router.post("/subscribe/:planId", protect, subscribePlan);

// GET /api/subscriptions/my-subscription
router.get("/my-subscription", protect, getMySubscription);

// GET /api/subscriptions/admin/subscriptions
router.get("/admin/subscriptions", protect, admin, getAllSubscriptions);

export default router;

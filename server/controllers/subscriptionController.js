import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

// Subscribe to a plan
export const subscribePlan = async (req, res) => {
  const { planId } = req.params;
  const userId = req.user._id;

  try {
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + plan.duration);

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
};

// Get current user's subscription
export const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user._id })
      .populate("plan", "name price features duration")
      .sort({ start_date: -1 });

    if (!subscription)
      return res.status(404).json({ message: "No active subscription found" });

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({})
      .populate("user", "name email")
      .populate("plan", "name price features duration")
      .sort({ start_date: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

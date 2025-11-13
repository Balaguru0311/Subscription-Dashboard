import Plan from "../models/Plan.js";

// GET all plans
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new plan (admin only)
export const createPlan = async (req, res) => {
  const { name, price, features, duration } = req.body;
  try {
    const plan = await Plan.create({ name, price, features, duration });
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

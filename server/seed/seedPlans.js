/* eslint-disable no-undef */
// import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Plan from "../models/Plan.js";

dotenv.config();

connectDB();

const seedPlans = async () => {
  try {
    // First, remove existing plans
    await Plan.deleteMany();

    const plans = [
      {
        name: "Basic",
        price: 9.99,
        features: [
          "Access to standard dashboards",
          "View and export basic reports",
          "Single user access",
          "Email support",
        ],
        duration: 30, // 30 days
      },
      {
        name: "Standard",
        price: 19.99,
        features: [
          "All Basic features",
          "Custom report builder",
          "Team collaboration (up to 5 users)",
          "Priority email & chat support",
          "Advanced analytics and trends",
        ],
        duration: 90, // 90 days
      },
      {
        name: "Premium",
        price: 29.99,
        features: [
          "All Pro features",
          "Unlimited team members",
          "Dedicated account manager",
          "Custom integrations (API access)",
          "24/7 priority support",
        ],
        duration: 180, // 180 days
      },
    ];

    await Plan.insertMany(plans);
    console.log("✅ Plans seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding plans:", error.message);
    process.exit(1);
  }
};

seedPlans();

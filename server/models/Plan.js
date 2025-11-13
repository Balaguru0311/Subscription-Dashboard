import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    features: {
      type: [String],
      default: [],
    },
    duration: {
      type: Number, // Duration in days
      required: [true, "Duration is required"],
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);
export default Plan;

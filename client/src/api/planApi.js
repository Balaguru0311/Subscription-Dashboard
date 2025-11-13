import axios from "axios";

const API_URL = "http://localhost:5000/api/plans";

// Get all plans
export const getPlans = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a plan (admin only)
export const createPlan = async (planData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, planData, config);
  return response.data;
};

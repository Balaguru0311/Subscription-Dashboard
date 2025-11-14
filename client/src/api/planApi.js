import axios from "axios";
import { BASE_URL } from "./api";

const API_URL = `${BASE_URL}/api/plans`;

export const getPlans = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPlan = async (planData, token) => {
  const response = await axios.post(API_URL, planData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

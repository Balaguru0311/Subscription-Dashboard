import axios from "axios";

const API_URL = "http://localhost:5000/api/subscriptions";

// Subscribe to a plan
export const subscribe = async (planId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/subscribe/${planId}`, {}, config);
  return response.data;
};

// Get current user subscription
export const getMySubscription = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/my-subscription`, config);
  return response.data;
};

// Admin: get all subscriptions
export const getAllSubscriptions = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/admin/subscriptions`, config);
  return response.data;
};

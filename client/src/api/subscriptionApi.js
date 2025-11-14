import axios from "axios";
import { BASE_URL } from "./api";

const API_URL = `${BASE_URL}/api/subscriptions`;

export const subscribe = async (planId, token) => {
  const response = await axios.post(`${API_URL}/subscribe/${planId}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getMySubscription = async (token) => {
  const response = await axios.get(`${API_URL}/my-subscription`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllSubscriptions = async (token) => {
  const response = await axios.get(`${API_URL}/admin/subscriptions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

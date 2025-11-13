import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as subscriptionApi from "../api/subscriptionApi.js";
import { logoutUser } from "./authSlice.js";

// Async thunks
export const fetchMySubscription = createAsyncThunk(
  "subscription/fetchMySubscription",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const response = await subscriptionApi.getMySubscription(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const subscribePlan = createAsyncThunk(
  "subscription/subscribePlan",
  async ({ planId, token }, thunkAPI) => {
    try {
      const response = await subscriptionApi.subscribe(planId, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscription: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMySubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(fetchMySubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(subscribePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(subscribePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.subscription = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export default subscriptionSlice.reducer;

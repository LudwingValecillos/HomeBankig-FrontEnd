import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadLoans = createAsyncThunk(
  "loadLoans",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://homebankig.onrender.com/api/loans/loansAvailable",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
      
    } catch (error) {
      
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const clearLoans = createAction("clearLoans", () => {
  return {
    payload: {},
  };
});

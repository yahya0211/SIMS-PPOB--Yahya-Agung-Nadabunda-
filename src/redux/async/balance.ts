import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";

export interface ITopUpResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  };
}

export const balanceAsync = createAsyncThunk<ITopUpResponse>("balance", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/balance", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });    

    return response.data; // Returning the full API response structure
  } catch (error) {
    const err = error as any;
    return rejectWithValue(err.message || "Terjadi kesalahan");
  }
});

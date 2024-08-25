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
    const response = await API.get<ITopUpResponse>("/balance", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || "Terjadi kesalahan");
  }
});

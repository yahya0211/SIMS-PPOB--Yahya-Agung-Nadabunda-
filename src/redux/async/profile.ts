import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";

export interface IProfileResponse {
  status: number;
  message: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
  };
}

export const getProfile = createAsyncThunk<IProfileResponse>("profile", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    return rejectWithValue(err.message || "Terjadi kesalahan");
  }
});

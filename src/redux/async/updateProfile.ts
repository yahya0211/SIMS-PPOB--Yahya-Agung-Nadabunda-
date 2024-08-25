import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";

export interface IUpdateProfileResponse {
  status: number;
  message: string;
  data: {
    first_name: string;
    last_name: string;
  };
}

export const updateProfileAsync = createAsyncThunk<IUpdateProfileResponse, { firstName: string; lastName: string }>("profile/update", async (body, { rejectWithValue }) => {
  try {
    const response = await API.put(
      "/profile/update",
      {
        first_name: body.firstName,
        last_name: body.lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response); // Tambahkan ini untuk melihat detail error
    const err = error as any;
    return rejectWithValue(err.message || "Terjadi kesalahan");
  }
});

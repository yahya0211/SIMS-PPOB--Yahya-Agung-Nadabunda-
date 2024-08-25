import { API } from "../../lib";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ITopUpInterface {
  top_up_amount: number;
}

export interface ITopUpResponse {
  status: number;
  message: string;
  top_up_amount: number;
}

export const topUpAsync = createAsyncThunk<ITopUpResponse, ITopUpInterface, { rejectValue: string }>("topup", async (props, { rejectWithValue }) => {
  try {
    const response = await API.post(
      "/topup",
      { top_up_amount: props.top_up_amount },
      {  
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "Terjadi kesalahan");
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";

interface ICreateTransactionInterface {
  service_code: string;
}

export interface ICreateTransactionResponse {
  status: number;
  message: string;
  service_code: string;
}

export const createTransactionAsync = createAsyncThunk<ICreateTransactionResponse, ICreateTransactionInterface>("transaction/createTransaction", async (data, { rejectWithValue }) => {
  try {
    console.log("Sending", data);

    const response = await API.post("/transaction", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message || "Terjadi kesalahan di bagian create transaction");
  }
});

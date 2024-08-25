import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";

interface ICreateTransactionInterface {
  service_code: string;
}

export interface ICreateTransactionResponse {
  status: number;
  message: string;
  data: {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: number;
    created_on: string;
  };
}

export const createTransactionAsync = createAsyncThunk<ICreateTransactionResponse, ICreateTransactionInterface>("transaction", async (data, { rejectWithValue }) => {
  try {
    console.log("Sending request with data:", data);
    const response = await API.post("/transaction", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error occurred:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message || "Terjadi kesalahan di bagian create transaction");
  }
});

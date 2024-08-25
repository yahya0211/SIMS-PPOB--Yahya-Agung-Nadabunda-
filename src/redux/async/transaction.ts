import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";

export interface ITransactionResponse {
  status: number;
  message: string;
  data: {
    offset: number;
    limit: number;
    records: [
      {
        invoice_number: string;
        transaction_type: string;
        description: string;
        total_amount: number;
        created_on: string;
      }
    ];
  };
}


export const transactionAsync = createAsyncThunk<ITransactionResponse, void, { rejectValue: ITransactionResponse }>("transaction/history", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/transaction/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message || "Terjadi kesalahan di bagian transaction history"); // Return a RejectWithValue object
  }
});

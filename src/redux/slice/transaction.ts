import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { transactionAsync, ITransactionResponse } from "../async/transaction";

export interface ITransactionHistoryState {
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

const initialState: ITransactionHistoryState = {
  status: 0,
  message: "",
  data: {
    offset: 0,
    limit: 0,
    records: [
      {
        invoice_number: "",
        transaction_type: "",
        description: "",
        total_amount: 0,
        created_on: "",
      },
    ],
  },
};

const transactionHistorySlice = createSlice({
  name: "transactionHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(transactionAsync.fulfilled, (state, action: PayloadAction<ITransactionResponse>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    });
  },
});

export default transactionHistorySlice.reducer;

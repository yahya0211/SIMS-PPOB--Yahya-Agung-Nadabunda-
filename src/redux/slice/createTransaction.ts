import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTransactionAsync, ICreateTransactionResponse } from "../async/createTransaction";

export interface ICreateTransactionState {
  status: number;
  message: string;
  service_code: string;
}

const initialState: ICreateTransactionResponse = {
  status: 0,
  message: "",
  service_code: "",
};

const createTransactionSlice = createSlice({
  name: "createTransaction",
  initialState,
  reducers: {
    TRANSACTION: (state, action: PayloadAction<ICreateTransactionResponse>) => {
      state.service_code = action.payload.service_code;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransactionAsync.pending, (_, action) => {
        console.log("pending");
        action.payload;
      })
      .addCase(createTransactionAsync.fulfilled, (state, action: PayloadAction<ICreateTransactionResponse>) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.service_code = action.payload.service_code;
      })
      .addCase(createTransactionAsync.rejected, (_, action) => {
        console.log("rejected");
        action.payload;
      });
  },
});

export default createTransactionSlice.reducer;

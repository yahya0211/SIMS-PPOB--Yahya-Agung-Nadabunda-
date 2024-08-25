import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { topUpAsync, ITopUpResponse } from "../async/topUp";

export interface ITopUpState {
  status: number;
  message: string;
  data: {
    balance: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: ITopUpState = {
  status: 0,
  message: "",
  data: {
    balance: 0,
  },
  isLoading: false,
  error: null,
};

const topUpSlice = createSlice({
  name: "topUp",
  initialState,
  reducers: {
    TOPUP: (state, action: PayloadAction<ITopUpResponse>) => {
      state.data.balance = action.payload.top_up_amount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(topUpAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(topUpAsync.fulfilled, (state, action: PayloadAction<ITopUpResponse>) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.data.balance = action.payload.top_up_amount;
      })
      .addCase(topUpAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string | null;
      });
  },
});

export default topUpSlice.reducer;

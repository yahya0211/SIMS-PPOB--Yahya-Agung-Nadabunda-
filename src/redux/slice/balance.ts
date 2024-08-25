import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { balanceAsync, ITopUpResponse } from "../async/balance";

export interface IBalanceState {
  status: number;
  message: string;
  data: {
    balance: number;
  };
}

const initialState: IBalanceState = {
  status: 0,
  message: "",
  data: {
    balance: 0,
  },
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(balanceAsync.fulfilled, (state, action: PayloadAction<ITopUpResponse>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data.balance = action.payload.data.balance;
    });
  },
});

export default balanceSlice.reducer;

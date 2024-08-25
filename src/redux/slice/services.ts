import { CreateSliceOptions, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getServices, IServicesInterface, IServicesResponse } from "../async/services";

export interface IServicesState {
  status: number;
  message: string;
  data: IServicesInterface[];
}

const initialState: IServicesState = {
  status: 0,
  message: "",
  data: [] as IServicesInterface[],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServices.fulfilled, (state, action: PayloadAction<IServicesResponse>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    });
  },
});

export default servicesSlice.reducer;

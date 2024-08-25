import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateProfileAsync, IUpdateProfileResponse } from "../async/updateProfile";

export interface IProfileState {
  status: number;
  message: string;
  data: {
    first_name: string;
    last_name: string;
  };
}

const initialState: IProfileState = {
  status: 0,
  message: "",
  data: {
    first_name: "",
    last_name: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfileAsync.fulfilled, (state, action: PayloadAction<IUpdateProfileResponse>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    });
  },
});

export default profileSlice.reducer;

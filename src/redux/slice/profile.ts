import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfile, IProfileResponse } from "../async/profile";

export interface IProfileState {
  status: number;
  message: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
  };
}

const initialState: IProfileState = {
  status: 0,
  message: "",
  data: {
    first_name: "",
    last_name: "",
    email: "",
    profile_image: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<IProfileResponse>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data;
    });
  },
});

export default profileSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse } from "../async/auth";
import { loginAsync } from "../async/auth";

export interface IAuthState {
  isLogin: boolean;
  token: string;
  data: {
    token: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
}

const initialState: IAuthState = {
  isLogin: false,
  token: "",
  data: {
    token: "",
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<ILoginResponse>) => {
      state.isLogin = true;
      state.token = action.payload.data.token;
    },
    LOGOUT: (state) => {
      state.isLogin = false;
      state.token = "";
      state.data = {
        token: "",
        email: "",
        first_name: "",
        last_name: "",
        profile_image: "",
      };
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
        state.isLogin = true;
        state.token = action.payload.data.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log("rejected", action);
        state.isLogin = false;
        state.token = "";
        state.data = {
          token: "",
          email: "",
          first_name: "",
          last_name: "",
          profile_image: "",
        };
      })
      .addCase(loginAsync.pending, (_, action) => {
        console.log("pending", action);
      });
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;
export default authSlice.reducer;

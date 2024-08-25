import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthToken, API } from "../../lib";

interface ILoginInterface {
  email: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
    token: string;
  };
}

export const loginAsync = createAsyncThunk<ILoginResponse, ILoginInterface, { rejectValue: string }>("/login", async (props, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/login", props);

    const token = data.data.token;
    const userData = data.data;

    setAuthToken(token);
    localStorage.setItem("token", token);

    return {
      token: token,
      data: userData,
    };
  } catch (error) {
    const err = error as any;
    return rejectWithValue(err.message || "Terjadi kesalahan");
  }
});

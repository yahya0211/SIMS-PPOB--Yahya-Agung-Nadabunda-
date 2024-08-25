import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib";

export interface IServicesResponse {
  status: number;
  message: string;
  data: IServicesInterface[];
}

export interface IServicesInterface {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export const getServices = createAsyncThunk<IServicesResponse>("services/getServices", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    return rejectWithValue(err.message || "Terjadi kesalahan");
  }
});

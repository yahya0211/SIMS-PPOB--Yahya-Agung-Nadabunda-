import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/auth";
import balanceReducer from "./slice/balance";
import transactionHistory from "./slice/transaction";
import topUpReducer from "./slice/topUp";
import profileReducer from "./slice/profile";
import updateProfileReducer from "./slice/updateProfile";
import serviceReducer from "./slice/services";
import transactionReducer from "./slice/createTransaction";

const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    transaction: transactionHistory,
    topUp: topUpReducer,
    profile: profileReducer,
    updateProfile: updateProfileReducer,
    service: serviceReducer,
    createTransaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

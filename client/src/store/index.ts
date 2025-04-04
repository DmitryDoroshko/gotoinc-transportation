import { configureStore } from "@reduxjs/toolkit";
import parcelsReducer from "./parcels/parcelsSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    parcels: parcelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userFormReducer from "./userFormSlice";

export const store = configureStore({
  reducer: {
    usersForm: userFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
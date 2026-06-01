import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  const newState = store.getState();
  console.log("newState", newState.auth);
});

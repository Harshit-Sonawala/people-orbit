import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole, type User } from "@/types";

interface AuthState {
  loggedInUserId: string | null;
}

const initialState: AuthState = {
  loggedInUserId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.loggedInUserId = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole, type User } from "@/types";

interface AuthState {
  loggedInUserId: string | null;
  loggedInUser: User | null;
}

const initialState: AuthState = {
  loggedInUserId: null,
  loggedInUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.loggedInUserId = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setUserId, setUser } = authSlice.actions;
export default authSlice.reducer;

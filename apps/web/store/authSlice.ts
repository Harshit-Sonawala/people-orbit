import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole, type User } from "@/types";

interface AuthState {
  userId: string | null;
  user: User | null;
}

const initialState: AuthState = {
  userId: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserId, setUser } = authSlice.actions;
export default authSlice.reducer;

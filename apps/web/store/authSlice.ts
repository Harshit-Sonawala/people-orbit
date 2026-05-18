import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

interface AuthState {
  loggedInUser: User | null;
}

const initialState: AuthState = {
  loggedInUser: {
    id: "arjun-mehta-1755163800000",
    firstName: "Arjun",
    lastName: "Mehta",
    age: 32,
    designation: "Senior Software Engineer",
    email: "arjun.mehta@examplesoft.com",
    phone: "+919876543210",
    profilePic: "https://i.pravatar.cc/300?u=1",
    bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    bio: "Full-stack wizard with a love for distributed systems and filter coffee.",
    skills: ["React", "Node.js", "Kubernetes"],
    socialLinks: {
      linkedIn: "https://linkedin.com/in/arjunmehta",
      github: "https://github.com/arjunm",
    },
    createdOn: Date.parse("2025-08-14T09:30:00.000Z"),
    updatedOn: Date.parse("2025-08-14T09:30:00.000Z"),
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

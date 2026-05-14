import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersFormState {
  forms: Record<string, any>; // form id string, any form data shape {}
}

const userFormInitialState: UsersFormState = {
  forms: {},
}

export const userFormSlice = createSlice({
  name: 'usersForm',
  initialState: userFormInitialState,
  reducers: {
    // Update or initialize a form's draft state
    setUserFormDraft: (
      state,
      action: PayloadAction<{ key: string; values: any }>
    ) => {
      const { key, values } = action.payload;
      state.forms[key] = values;
    },

    // Remove a specific form draft after submit
    clearUserFormDraft: (state, action: PayloadAction<string>) => {
      delete state.forms[action.payload];
    },
  },
});

export const { setUserFormDraft, clearUserFormDraft } = userFormSlice.actions;
export default userFormSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  visible: boolean;
}

type ShowNotificationPayload = Omit<NotificationState, "visible">;

const initialState: NotificationState = {
  title: "",
  message: "",
  type: "info",
  visible: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<ShowNotificationPayload>,
    ) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
    },

    hideNotification: (state) => {
      state.title = "";
      state.message = "";
      state.type = "info";
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

"use client";
import { Card, Heading, Button } from "@/components";
import { InfoRounded, CloseRounded } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { hideNotification } from "@/store/notificationSlice";

export const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  return (
    notification.visible && (
      <Card className="max-w-lg fixed bottom-4 right-4">
        <div className="flex flex-1 flex-row items-center gap-4">
          {notification.type === "info" && (
            <InfoRounded className="text-primary icon-xl" />
          )}
          {notification.type === "warning" && (
            <InfoRounded className="text-warning icon-xl" />
          )}
          {notification.type === "error" && (
            <InfoRounded className="text-error icon-xl" />
          )}
          {notification.type === "success" && (
            <InfoRounded className="text-secondary icon-xl" />
          )}
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center justify-between gap-4">
                <Heading>{notification.title}</Heading>
              </div>
              <Button
                variant="surface-rounded"
                onClick={() => {
                  dispatch(hideNotification());
                }}
                className="p-3"
              >
                <CloseRounded className="icon-md" />
              </Button>
            </div>
            <p>{notification.message}</p>
          </div>
        </div>
      </Card>
    )
  );
};

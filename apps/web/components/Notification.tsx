"use client";
import { Card, Heading, Button } from "@/components";
import {
  InfoRounded,
  WarningRounded,
  ErrorRounded,
  CheckCircle,
  CloseRounded,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { hideNotification } from "@/store/notificationSlice";
import { useEffect } from "react";

export const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [notification.visible]);

  return (
    notification.visible && (
      <Card className="z-30 max-w-lg fixed bottom-4 right-4 border border-surface-top">
        <div className="flex flex-1 flex-row items-center gap-4">
          {notification.type === "info" && (
            <InfoRounded className="text-info icon-xl" />
          )}
          {notification.type === "warning" && (
            <WarningRounded className="text-warning icon-xl" />
          )}
          {notification.type === "error" && (
            <ErrorRounded className="text-error icon-xl" />
          )}
          {notification.type === "success" && (
            <CheckCircle className="text-secondary icon-xl" />
          )}
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center justify-between gap-4">
                <Heading
                  variant="sm"
                  className={
                    notification.type === "success"
                      ? `text-secondary`
                      : notification.type === "warning"
                        ? `text-warning`
                        : notification.type === "error"
                          ? `text-error`
                          : `text-info`
                  }
                >
                  {notification.title}
                </Heading>
              </div>
              <Button
                variant="surface-rounded"
                onClick={() => {
                  dispatch(hideNotification());
                }}
                className="p-2"
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

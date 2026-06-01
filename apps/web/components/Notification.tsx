import { Card, Heading, Button } from "@/components";
import { InfoRounded, CloseRounded } from "@mui/icons-material";

type Props = {};

export const Notification = (props: Props) => {
  return (
    <Card className="max-w-lg">
      <div className="flex flex-row items-center gap-4">
        <InfoRounded className="text-secondary icon-xl" />
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center justify-between gap-4">
              <Heading>Notification Title</Heading>
            </div>
            <Button
              variant="surface-rounded"
              onClick={() => console.log("Notification Pressed")}
              className="p-3"
            >
              <CloseRounded className="icon-md" />
            </Button>
          </div>
          <p>
            This is an example notification.This is an example notification.This
            is an example notification.This is an example notification.This is
            an example notification.
          </p>
        </div>
      </div>
    </Card>
  );
};

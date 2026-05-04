import { Heading1, Heading3, Divider } from "@/components";
import {
  CreatePeopleForm,
  ReplacePeopleForm,
  DeletePeopleForm,
} from "@/app/account/_components/";

type Props = {};

export default function Account({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Heading1>Manage Users</Heading1>
        <Divider />
      </div>

      <div className="flex flex-col gap-2">
        <Heading3 className="text-secondary">
          POST - Create New Person Record
        </Heading3>
        <CreatePeopleForm />
      </div>

      <div className="flex flex-col gap-2">
        <Heading3 className="text-secondary">
          PUT - Replace Person Record
        </Heading3>
        <ReplacePeopleForm />
      </div>

      <div className="flex flex-col gap-2">
        <Heading3 className="text-secondary">
          DELETE - Delete Person Record
        </Heading3>
        <DeletePeopleForm />
      </div>
    </div>
  );
}

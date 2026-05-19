import { Heading, Divider } from "@/components";
import {
  CreateUserForm,
  ReplaceUserForm,
  DeleteUserForm,
} from "@/app/account/_components/";

type Props = {};

export default function Account({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Heading variant="lg">Manage Users</Heading>
        <Divider />
      </div>

      <div className="flex flex-col gap-2">
        <Heading variant="sm" className="text-secondary">
          POST - Create New Person Record
        </Heading>
        <CreateUserForm />
      </div>

      <div className="flex flex-col gap-2">
        <Heading variant="sm" className="text-secondary">
          PUT - Replace Person Record
        </Heading>
        <ReplaceUserForm />
      </div>

      <div className="flex flex-col gap-2">
        <Heading variant="sm" className="text-secondary">
          DELETE - Delete Person Record
        </Heading>
        <DeleteUserForm />
      </div>
    </div>
  );
}

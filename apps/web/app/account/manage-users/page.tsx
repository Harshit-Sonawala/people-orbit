import { Heading, Divider } from "@/components";
import {
  CreateUserForm,
  ReplaceUserForm,
  DeleteUserForm,
} from "@/components/forms";

type Props = {};

export default function Account({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-8 w-[90%] lg:w-[80%] mx-auto pb-32">
      <div className="flex flex-col gap-2">
        <Heading variant="lg">Manage Users</Heading>
        <Divider />
      </div>
      <CreateUserForm />
      <ReplaceUserForm />
      <DeleteUserForm />
    </div>
  );
}

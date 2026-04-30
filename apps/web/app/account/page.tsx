import React from "react";
import { Header1, Header3, Divider } from "@/components";
import CreatePersonForm from "@/app/account/_components/CreatePeopleForm";
import ReplacePersonForm from "@/app/account/_components/ReplacePeopleForm";

type Props = {};

export default function Account({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Header1>Account</Header1>
        <Divider />
      </div>

      <Header3 className="text-secondary">
        POST - Create New Person Record
      </Header3>
      <div className="flex flex-col gap-2">
        <CreatePersonForm />
      </div>

      <Header3 className="text-secondary">PUT - Replace Person Record</Header3>
      <div className="flex flex-col gap-2">
        <ReplacePersonForm />
      </div>
    </div>
  );
}

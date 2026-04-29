import React from "react";
import { Header1, Header3, Divider } from "@/components";
import PostPersonForm from "@/app/account/_components/PostPeopleForm";

type Props = {};

export default function Account({ }: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      <div className="flex flex-col gap-2">
        <Header1>Account</Header1>
        <Divider variant="primary" />
      </div>
      <div className="flex flex-col gap-2">
        <PostPersonForm />
      </div>
    </div>
  );
}
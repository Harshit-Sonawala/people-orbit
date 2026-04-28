import React from "react";
import { Header1, Divider } from "@/components";

type Props = {};

function Account({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4 w-[60%] mx-auto">
      <Header1>Account</Header1>
      <Divider variant="primary" />
    </div>
  );
}

export default Account;

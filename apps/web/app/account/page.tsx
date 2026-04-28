import React from "react";
import Header1 from "@/components/Header1";
import Divider from "@/components/Divider";

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

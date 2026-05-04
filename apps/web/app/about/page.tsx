import React from "react";
import { Heading1, Divider } from "@/components";

type Props = {};

export default function About({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      <Heading1>About</Heading1>
      <Divider />
    </div>
  );
}

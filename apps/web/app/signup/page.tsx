import React from "react";
import { Heading, Divider } from "@/components";

type Props = {};

export default function Signup({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      <Heading variant="lg">Signup</Heading>
      <Divider />
    </div>
  );
}

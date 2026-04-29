import React from "react";
import { Header1, Divider } from "@/components";

type Props = {};

export default function About({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4">
      <Header1>About</Header1>
      <Divider variant="primary" />
    </div>
  );
}
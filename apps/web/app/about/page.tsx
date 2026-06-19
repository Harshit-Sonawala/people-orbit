import React from "react";
import { Heading, Divider, Card } from "@/components";

type Props = {};

export default function About({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-8 w-[90%] lg:w-[80%] mx-auto pb-32">
      <Heading variant="lg">About</Heading>
      <Divider />
    </div>
  );
}

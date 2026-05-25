import React from "react";
import { Heading, Divider, CustomLink } from "@/components";
import { SignupForm } from "@/components/forms";

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-6 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Heading variant="lg">Signup</Heading>
        <Divider />
      </div>
      <SignupForm />
    </div>
  );
}

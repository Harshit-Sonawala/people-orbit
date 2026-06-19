import { Heading, Divider } from "@/components";
import { LoginForm } from "@/components/forms";

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-8 w-[90%] lg:w-[80%] mx-auto pb-32">
      <div className="flex flex-col gap-2">
        {/* <Heading variant="lg">Login</Heading>
        <Divider /> */}
      </div>
      <LoginForm />
    </div>
  );
}

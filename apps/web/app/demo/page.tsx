"use client";
import {
  Heading,
  Card,
  Divider,
  Button,
  TextInput,
  TextArea,
  CustomLink,
  UserCard,
  SearchResultCard,
} from "@/components";
import { User } from "@/types";

export default function Demo() {
  const dummyUser: User = {
    id: "arjun-mehta-1755163800000",
    firstName: "Arjun",
    lastName: "Mehta",
    age: 32,
    designation: "Senior Software Engineer",
    email: "arjun.mehta@examplesoft.com",
    phone: "+919876543210",
    profilePic: "https://i.pravatar.cc/300?u=1",
    bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    bio: "Full-stack wizard with a love for distributed systems and filter coffee.",
    skills: ["React", "Node.js", "Kubernetes"],
    socialLinks: {
      linkedIn: "https://linkedin.com/in/arjunmehta",
      github: "https://github.com/arjunm",
    },
    createdOn: Date.parse("2025-08-14T09:30:00.000Z"),
    updatedOn: Date.parse("2025-08-14T09:30:00.000Z"),
  };

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-10">
      <div className="flex flex-col gap-2">
        <Heading variant="lg">Components Demo Page</Heading>
        <Divider />
      </div>

      <div className="flex flex-col gap-4">
        <Heading variant="sm" className="text-secondary">
          Cards
        </Heading>

        <UserCard User={dummyUser} />
        <SearchResultCard User={dummyUser} />

        <Card variant="surface">
          <p>Card default surface variant</p>
        </Card>
        <Card>
          <p className="py-4">Parent Card</p>
          <Card variant="surface-top">
            <p>Child Card surface-top variant</p>
          </Card>
        </Card>
        <Card variant="outlined">
          <p>Card outlined variant</p>
        </Card>
        <Card variant="outlined-primary">
          <p>Card outlined-primary variant</p>
        </Card>
      </div>

      <div className="flex flex-col gap-2">
        <Heading variant="sm" className="text-secondary">
          Buttons
        </Heading>
        <Card>
          <Button onClick={() => console.log("Filled button pressed.")}>
            Filled Button
          </Button>
          <Button
            variant="outlined"
            onClick={() => console.log("Outlined button pressed.")}
          >
            Outlined Button
          </Button>
          <Button
            variant="rounded"
            onClick={() => console.log("Rounded button pressed.")}
          >
            Rounded Button
          </Button>
          <Button
            variant="outlined-rounded"
            onClick={() => console.log("Outlined Rounded button pressed.")}
          >
            Outlined Rounded Button
          </Button>
          <Button disabled={true}>Disabled Button</Button>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Heading variant="sm" className="text-secondary">
          Dividers
        </Heading>
        <Divider />
        <Divider variant="surface-top" />
        <Divider variant="primary" />
        <Divider variant="secondary" />
      </div>

      <div className="flex flex-col gap-2">
        <Heading variant="sm" className="text-secondary">
          TextInputs
        </Heading>
        <TextInput placeholder="Please Enter Text..." />
        <TextInput disabled={true} placeholder="Disabled Text Input" />
        <TextInput
          placeholder="TextInput with error"
          error="Please enter a valid email id."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading variant="sm" className="text-secondary">
          TextAreas
        </Heading>
        <TextArea placeholder="Please Enter Bio..." />
        <TextArea disabled={true} placeholder="Disabled Text Area" />
        <TextArea
          placeholder="TextArea with error"
          error="Bio must be within 140 characters."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading variant="sm" className="text-secondary">
          CustomLinks
        </Heading>
        <CustomLink href="#">Click Here</CustomLink>
        <CustomLink href="#">Click Here</CustomLink>
        <CustomLink href="#">Click Here</CustomLink>
      </div>

      <div className="flex flex-col gap-2">
        <Heading variant="sm" className="text-secondary">
          Headings
        </Heading>
        <p>Heading 1</p>
        <Heading variant="lg">This is Heading 1.</Heading>
        <p>Heading 2</p>
        <Heading variant="md">This is Heading 2.</Heading>
        <p>Heading 3</p>
        <Heading variant="sm">This is Heading 3.</Heading>
      </div>
    </div>
  );
}

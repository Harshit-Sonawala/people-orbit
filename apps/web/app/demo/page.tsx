"use client";
import {
  Heading1,
  Heading2,
  Heading3,
  Card,
  Divider,
  Button,
  TextInput,
  TextArea,
  CustomLink,
} from "@/components";

export default function Demo() {
  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-10">
      <div className="flex flex-col gap-2">
        <Heading1>Components Demo Page</Heading1>
        <Divider />
      </div>

      <div className="flex flex-col gap-2">
        <Heading3 className="text-secondary">Headers</Heading3>
        <p>Header 1</p>
        <Heading1>This is an example of Header 1.</Heading1>
        <p>Header 2</p>
        <Heading2>This is an example of Header 2.</Heading2>
        <p>Header 3</p>
        <Heading3>This is an example of Header 3.</Heading3>
      </div>

      <div className="flex flex-col gap-2">
        <Heading3 className="text-secondary">Cards</Heading3>
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
        <Heading3 className="text-secondary">Buttons</Heading3>
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
        <Heading3 className="text-secondary">Dividers</Heading3>
        <Divider />
        <Divider variant="surface-top" />
        <Divider variant="primary" />
        <Divider variant="secondary" />
      </div>

      <div className="flex flex-col gap-2">
        <Heading3 className="text-secondary">TextInputs</Heading3>
        <TextInput placeholder="Please Enter Text..." />
        <TextInput disabled={true} placeholder="Disabled Text Input" />
        <TextInput
          placeholder="TextInput with error"
          error="Please enter a valid email id."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading3 className="text-secondary">TextAreas</Heading3>
        <TextArea placeholder="Please Enter Bio..." />
        <TextArea disabled={true} placeholder="Disabled Text Area" />
        <TextArea
          placeholder="TextArea with error"
          error="Bio must be less than 140 characters."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading3 className="text-secondary">CustomLinks</Heading3>
        <CustomLink href="#">Click Here</CustomLink>
        <CustomLink href="#">Click Here</CustomLink>
        <CustomLink href="#">Click Here</CustomLink>
      </div>
    </div>
  );
}

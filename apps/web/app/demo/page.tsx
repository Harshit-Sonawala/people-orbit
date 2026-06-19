"use client";
import { User, UserRole } from "@/types";
import { showNotification } from "@/store/notificationSlice";
import { useDispatch } from "react-redux";
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
  StatCard,
} from "@/components";
import { CustomBarChart, CustomLineChart } from "@/components/charts";
import {
  PeopleAltRounded,
  WorkRounded,
  EmojiEventsRounded,
} from "@mui/icons-material";

export default function Demo() {
  const dispatch = useDispatch();

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
    createdAt: Date.parse("2025-08-14T09:30:00.000Z"),
    updatedAt: Date.parse("2025-08-14T09:30:00.000Z"),
    role: UserRole.USER,
    isBanned: false,
  };

  const dummyBarChartData = [
    { name: "React", frequency: 24 },
    { name: "Next.js", frequency: 36 },
    { name: "NestJS", frequency: 15 },
    { name: "Tanstack Query", frequency: 9 },
    { name: "Tailwind CSS", frequency: 32 },
    { name: "Postgres", frequency: 20 },
    { name: "Docker", frequency: 10 },
  ];

  const dummyLineChartData = [
    { date: new Date("2026-01-01"), newUsers: 9 },
    { date: new Date("2026-02-01"), newUsers: 22 },
    { date: new Date("2026-03-01"), newUsers: 34 },
    { date: new Date("2026-04-01"), newUsers: 58 },
    { date: new Date("2026-05-01"), newUsers: 109 },
  ];

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-10 w-[90%] lg:w-[80%] mx-auto pb-32">
      <div className="flex flex-col gap-2">
        <Heading variant="lg">Components Demo Page</Heading>
        <Divider />
      </div>

      <div className="flex flex-col gap-4">
        <Heading variant="sm" className="text-secondary">
          Dashboard Components (Stat Cards & Charts)
        </Heading>

        <div className="flex flex-row flex-wrap gap-4">
          <StatCard
            icon={<PeopleAltRounded className="icon-lg" />}
            title="Total Users"
            statistic="1,248"
            color="primary"
          />
          <StatCard
            icon={<WorkRounded className="icon-lg" />}
            title="Designations"
            statistic="42"
            color="info"
          />
          <StatCard
            icon={<EmojiEventsRounded className="icon-lg" />}
            title="Awards Given"
            statistic="15"
            color="accent"
          />
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          <CustomBarChart
            data={dummyBarChartData}
            xAxisKey="name"
            yAxisKey="frequency"
            title="Demo Skills Distribution"
            subtitle="Frequency distribution of popular skills"
          />
          <CustomLineChart
            data={dummyLineChartData}
            xAxisKey="date"
            yAxisKey="newUsers"
            title="Demo New Users Trend"
            subtitle="User registration growth over time"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Heading variant="sm" className="text-secondary">
          Notifications
        </Heading>
        <Card className="max-w-md">
          <Button
            onClick={() => {
              dispatch(
                showNotification({
                  title: "Example Notification",
                  message: "This is an example of a sample notification.",
                  type: "info",
                }),
              );
            }}
          >
            Show Info Notification
          </Button>
          <Button
            onClick={() => {
              dispatch(
                showNotification({
                  title: "Medium Length Warning Title",
                  message:
                    "This is an example of a warning notification. This is an example of a warning notification.",
                  type: "warning",
                }),
              );
            }}
          >
            Show Warning Notification
          </Button>
          <Button
            onClick={() => {
              dispatch(
                showNotification({
                  title:
                    "Very Long Error Notification Title. Please Try Again.",
                  message: "This is an example of an error notification.",
                  type: "error",
                }),
              );
            }}
          >
            Show Error Notification
          </Button>
          <Button
            onClick={() => {
              dispatch(
                showNotification({
                  title: "Success Notification",
                  message: "This is an example of a success notification.",
                  type: "success",
                }),
              );
            }}
          >
            Show Success Notification
          </Button>
        </Card>

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
          <Button
            variant="surface"
            onClick={() => console.log("Surface button pressed.")}
          >
            Surface Button
          </Button>
          <Button
            variant="surface-rounded"
            onClick={() => console.log("Surface Rounded button pressed.")}
          >
            Surface Rounded Button
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

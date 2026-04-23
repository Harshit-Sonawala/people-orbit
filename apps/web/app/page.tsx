"use client";
import { Formik } from "formik"; // Formik forms
import * as Yup from "yup"; // Yup Schema Validation
import Card from "../components/Card";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import Header3 from "../components/Header3";
import Button from "../components/Button";
import Divider from "../components/Divider";
import TextInput from "../components/TextInput";
import PersonCard from "../components/PersonCard";
import { useFetchPeople } from "../hooks/useFetchPeople";
// import { dummyPersonData } from '../types/dummyPersonData';

export default function Home() {
  const { data: people, isLoading, isError, error } = useFetchPeople();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center w-[90%] mx-auto">
      {isLoading && <p className="text-center py-8">Loading...</p>}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}
      {people && (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {people.map((person, i) => (
            <PersonCard person={person} key={person.id ?? i} />
          ))}
        </div>
      )}

      {/* <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyPersonData.map((_, i) => (<PersonCard person={dummyPersonData[i]} key={i} />))}
      </div> */}

      <div className="m-4" />

      <Card className="flex flex-col items-stretch justify-center gap-2 w-full mx-auto">
        <Header3>Post person information</Header3>
        <Divider variant="primary" />
        <Formik
          initialValues={{ firstName: "", lastName: "", designation: "", email: "" }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(40, "First name must be 40 characters or less")
              .required("Required Field"),
            lastName: Yup.string()
              .max(40, "Last name must be 40 characters or less")
              .required("Required Field"),
            designation: Yup.string()
              .max(40, "Designation must be 40 characters or less")
              .required("Required Field"),
            email: Yup.string()
              .email("Please enter a valid email address")
              .required("Required Field"),
            phone: Yup.string()
              .matches(phoneRegExp, "Please enter a valid phone number")
              .required("Required Field")
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {(formik) => (
            <form
              className="flex flex-col items-stretch align-center gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-row items-center justify-stretch gap-4">
                <div className="flex flex-col items-start justify-center gap-2">
                  <label htmlFor="firstName">First Name</label>
                  <TextInput
                    id="firstName"
                    type="text"
                    placeholder="Johnathan"
                    error={formik.errors.firstName}
                    {...formik.getFieldProps("firstName")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName">Last Name</label>
                  <TextInput
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    error={formik.errors.lastName}
                    {...formik.getFieldProps("lastName")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="designation">Designation</label>
                <TextInput
                  variant="filled"
                  id="designation"
                  type="text"
                  placeholder="Full Stack Developer"
                  error={formik.errors.designation}
                  {...formik.getFieldProps("designation")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <TextInput
                  variant="filled"
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  error={formik.errors.email}
                  {...formik.getFieldProps("email")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone">Phone Number</label>
                <TextInput
                  variant="filled"
                  id="phone"
                  type="text"
                  placeholder="+910987654321"
                  error={formik.errors.phone}
                  {...formik.getFieldProps("phone")}
                />
              </div>

              <div className="flex flex-row gap-4">
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  onClick={formik.handleReset}
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Card>

      <div className="m-4" />

      <div className="m-2 flex flex-col gap-2">
        <p>Components Demo:</p>
        <p>Header 1</p>
        <Header1>This is an example of Header 1.</Header1>
        <p>Header 2</p>
        <Header2>This is an example of Header 2.</Header2>
        <p>Header 3</p>
        <Header3>This is an example of Header 3.</Header3>

        <div className="m-4" />

        <p>Card Component</p>
        <Card variant="surface">
          <p>Card surface variant</p>
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

        <div className="m-4" />

        <p>Button Component</p>
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
        </Card>

        <div className="m-4" />

        <p>Divider Component</p>
        <Divider />

        <div className="m-4" />

        <p>Custom Single Line TextInput Component</p>
        <TextInput placeholder="Please Enter Text..." />
        <TextInput disabled={true} placeholder="Disabled Text Input" />
        <TextInput
          placeholder="TextInput with error"
          error="Please enter a valid email id."
        />
      </div>
    </div>
  );
}

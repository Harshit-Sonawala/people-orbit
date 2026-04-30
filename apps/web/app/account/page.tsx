"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { usePeople } from "@/hooks/usePeople";
import {
  Header1,
  Header3,
  Divider,
  Button,
  TextInput,
  Card,
} from "@/components";
import CreatePersonForm from "@/app/account/_components/CreatePeopleForm";
import ReplacePersonForm from "@/app/account/_components/ReplacePeopleForm";
import { AlternateEmailRounded } from "@mui/icons-material";

type Props = {};

export default function Account({}: Props) {
  const { mutate: deletePeople, isPending: deletePeopleIsPending } =
    usePeople().deleteById;

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4 w-[80%] mx-auto">
      <div className="flex flex-col gap-2">
        <Header1>Account</Header1>
        <Divider />
      </div>

      <Header3 className="text-secondary">
        POST - Create New Person Record
      </Header3>
      <div className="flex flex-col gap-2">
        <CreatePersonForm />
      </div>

      <Header3 className="text-secondary">PUT - Replace Person Record</Header3>
      <div className="flex flex-col gap-2">
        <ReplacePersonForm />
      </div>

      <Header3 className="text-secondary">
        DELETE - Delete Person Record
      </Header3>
      <Card className="flex flex-col items-stretch justify-center gap-4">
        <Formik
          initialValues={{
            id: "",
          }}
          validationSchema={Yup.object({
            id: Yup.string()
              .matches(
                /^[a-z0-9]+$/,
                "ID can only contain lowercase letters and numbers",
              )
              .max(16, "Must be within 16 characters")
              .required("Required Field"),
          })}
          onSubmit={(values, { resetForm }) => {
            deletePeople(values.id, {
              onSuccess: () => {
                console.log(
                  `User data for ID: ${values.id} Deleted Successfully`,
                );
                resetForm();
              },
            });
          }}
        >
          {(formik) => (
            <form
              className="flex flex-row items-center justify-center gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-row items-center gap-2">
                <AlternateEmailRounded className="text-primary" />
                <label htmlFor="id">User ID:</label>
                <TextInput
                  id="id"
                  type="text"
                  placeholder="10"
                  className="w-full"
                  error={formik.errors.id}
                  {...formik.getFieldProps("id")}
                />
              </div>

              <Button
                disabled={deletePeopleIsPending}
                type="submit"
                className="flex-1 py-2"
              >
                {deletePeopleIsPending ? `Saving...` : `Delete`}
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

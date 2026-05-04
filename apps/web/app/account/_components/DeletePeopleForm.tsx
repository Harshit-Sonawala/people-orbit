"use client";
import { Formik } from "formik";
import * as Yup from "yup";
import { usePeople } from "@/hooks/usePeople";
import { Button, TextInput, Card } from "@/components";
import { AlternateEmailRounded } from "@mui/icons-material";

type Props = {};

export const DeletePeopleForm = (props: Props) => {
  const { mutate: deletePeople, isPending: deletePeopleIsPending } =
    usePeople().deleteById;

  return (
    <Card className="flex flex-col items-stretch justify-center gap-4 w-[60%]">
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
            className="flex flex-col items-stretch justify-center gap-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-row items-center gap-2">
              <AlternateEmailRounded className="text-primary" />
              <label htmlFor="id">User ID:</label>
            </div>
            <TextInput
              id="id"
              type="text"
              placeholder="10"
              className="w-full"
              error={formik.errors.id}
              {...formik.getFieldProps("id")}
            />

            <Button
              disabled={deletePeopleIsPending}
              type="submit"
              className="flex-1"
            >
              {deletePeopleIsPending ? `Saving...` : `Delete`}
            </Button>
          </form>
        )}
      </Formik>
    </Card>
  );
};

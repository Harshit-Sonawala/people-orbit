"use client";
import { Formik } from "formik";
import * as Yup from "yup";
import { idValidation } from "./formValidations";
import { getFormError } from "@/utils/getFormError";
import { useUsers } from "@/hooks";
import { Heading, Divider, Button, TextInput, Card } from "@/components";
import { AlternateEmailRounded } from "@mui/icons-material";

type Props = {};

export const DeleteUserForm = (props: Props) => {
  const { deleteById } = useUsers();
  const { mutate, isPending } = deleteById();

  return (
    <Card className="flex flex-col items-stretch justify-center gap-4 w-[60%]  py-10 px-12">
      <Formik
        initialValues={{
          id: "",
        }}
        validationSchema={Yup.object({
          id: idValidation,
        })}
        onSubmit={(values, { resetForm }) => {
          mutate(values.id, {
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
            <div className="flex flex-col gap-2">
              <Heading variant="md" className="text-secondary">
                Delete User Record
              </Heading>
              <Divider variant="surface-top" />
              <p>Delete the entire user profile based on the specified id.</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <AlternateEmailRounded className="text-primary" />
              <label htmlFor="id">User ID:</label>
            </div>
            <TextInput
              id="id"
              type="text"
              placeholder="10"
              className="w-full"
              error={getFormError("id", formik.errors, formik.touched)}
              {...formik.getFieldProps("id")}
            />

            <Button disabled={isPending} type="submit" className="flex-1">
              {isPending ? `Deleting...` : `Delete`}
            </Button>
          </form>
        )}
      </Formik>
    </Card>
  );
};

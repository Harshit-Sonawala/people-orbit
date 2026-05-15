"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, Button } from "@/components";
import { SearchRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const SearchInput = () => {
  const router = useRouter();
  const allowedCharsRegex = /[^A-Za-z0-9\s'.&/@+-]/g;

  return (
    <div className="hidden md:block flex-row items-center gap-2 relative">
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { resetForm }) => {
          const sanitizedQuery = values.query
            .trim()
            .replace(allowedCharsRegex, ""); // silently sanitize instead of showing errors

          if (sanitizedQuery) {
            router.push(`/search?q=${encodeURIComponent(sanitizedQuery)}`);
            resetForm();
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              id="query"
              type="text"
              variant="rounded"
              placeholder="Search..."
              className="sm:w-64 md:w-72 lg:w-84"
              // error={formik.errors.query && formik.errors.query}
              {...formik.getFieldProps("query")}
            />
            <Button
              variant="rounded"
              className="absolute right-0.5 top-0.5 px-4"
              type="submit"
            >
              <SearchRounded />
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

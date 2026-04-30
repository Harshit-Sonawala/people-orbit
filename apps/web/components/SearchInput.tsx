import React from "react";
import { TextInput, Button } from "@/components";
import { SearchRounded } from "@mui/icons-material";

type Props = {};

const SearchInput = (props: Props) => {
  return (
    <div className="hidden md:block flex flex-row items-center gap-2 relative">
      <TextInput
        variant="rounded"
        placeholder="Search..."
        className="sm:w-64 md:w-72 lg:w-84"
      />
      <Button variant="rounded" className="absolute right-0.5 top-0.5 px-4">
        <SearchRounded />
      </Button>
    </div>
  );
};

export default SearchInput;

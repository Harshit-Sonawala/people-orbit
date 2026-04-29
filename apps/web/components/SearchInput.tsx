import React from "react";
import { TextInput, Button } from "@/components";
import { SearchRounded } from "@mui/icons-material";

type Props = {};

const SearchInput = (props: Props) => {
  return (
    <div className="flex flex-row gap-2 relative">
      <TextInput
        variant="rounded"
        placeholder="Search..."
        className="md:w-sm lg:w-md"
      />
      <Button variant="rounded" className="absolute right-0.5 top-0.5 px-4">
        <SearchRounded />
      </Button>
    </div>
  );
};

export default SearchInput;

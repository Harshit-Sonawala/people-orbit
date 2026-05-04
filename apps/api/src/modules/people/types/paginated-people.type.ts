import { People } from "./";

export type PaginatedPeople = {
  data: People[];
  meta: {
    total: number;
    limit: number;
    totalPages: number;
    currentPage: number;
  };
};
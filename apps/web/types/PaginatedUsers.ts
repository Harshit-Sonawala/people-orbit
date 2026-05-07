import { User } from ".";

export type PaginatedUsers = {
  data: User[];
  meta: {
    total: number;
    limit: number;
    totalPages: number;
    currentPage: number;
  };
};
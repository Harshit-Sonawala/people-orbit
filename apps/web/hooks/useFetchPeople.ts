import { useQuery } from "@tanstack/react-query";
import { PaginatedPeople } from "../types/People";

export const useFetchPeople = (page: number = 1, limit: number = 12) =>
  useQuery({
    queryKey: ["people", page, limit],
    queryFn: async (): Promise<PaginatedPeople> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GET_ALL_PEOPLE_URL}?page=${page}&limit=${limit}`,
      );
      if (!res.ok) throw new Error("Failed to fetch people");
      return res.json();
    },
  });

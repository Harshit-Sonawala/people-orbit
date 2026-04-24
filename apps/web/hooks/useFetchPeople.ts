import { useQuery } from "@tanstack/react-query";
import { People, PaginatedPeople } from "../types/People";

export const useFetchPeople = () =>
  useQuery({
    queryKey: ["people"],
    queryFn: async (): Promise<PaginatedPeople> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_GET_ALL_PEOPLE_URL}?page=3&limit=12`);
      if (!res.ok) throw new Error("Failed to fetch people");
      return res.json();
    },
  });

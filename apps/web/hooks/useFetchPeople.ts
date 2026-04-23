import { useQuery } from "@tanstack/react-query";
import { People } from "../types/People";

export const useFetchPeople = () =>
  useQuery({
    queryKey: ["people"],
    queryFn: async (): Promise<People[]> => {
      const res = await fetch(process.env.FETCH_ALL_PEOPLE_URL ?? "http://localhost:4000/api/people");
      if (!res.ok) throw new Error("Failed to fetch people");
      return res.json();
    },
  });

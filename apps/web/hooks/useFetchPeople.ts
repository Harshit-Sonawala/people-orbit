import { useQuery } from "@tanstack/react-query";
import { Person } from "../types/Person";

export const useFetchPeople = () =>
  useQuery({
    queryKey: ["people"],
    queryFn: async (): Promise<Person[]> => {
      const res = await fetch(process.env.FETCH_ALL_PEOPLE_URL ?? "http://localhost:4000/api/people");
      if (!res.ok) throw new Error("Failed to fetch people");
      return res.json();
    },
  });

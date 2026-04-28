import { useQuery } from "@tanstack/react-query";
import { People } from "@/types/People";

export const useFetchPeopleSingle = ( id: string | number ) => useQuery({
  queryKey: ["peopleSingle", id],
  queryFn: async (): Promise<People> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PEOPLE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch single person record");
    const data = await res.json();
    return data as People;
  },
  enabled: !!id, // force convert into boolean. undefined, null, or 0, !!id will be false.
});
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { People, PaginatedPeople } from "@/types/People";

const PEOPLE_URL = process.env.NEXT_PUBLIC_PEOPLE_URL ?? "http://localhost:4000/api/people";

export const usePeople = (id?: string, page: number = 1, limit: number = 12) => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ["people", page, limit],
    queryFn: async (): Promise<PaginatedPeople> => {
      const res = await fetch(`${PEOPLE_URL}?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("usePeople getAll error: Failed to fetch people");
      const data = await res.json();
      return data;
    },
  });

  const getById = useQuery({
    queryKey: ["peopleSingle", id],
    queryFn: async (): Promise<People> => {
      const res = await fetch(`${PEOPLE_URL}/${id}`);
      if (!res.ok) throw new Error("usePeople getById error: Failed to fetch person record");
      const data = await res.json();
      return data;
    },
    enabled: !!id, // dont try fetching until we have id. Force convert to boolean trick
  });

  const create = useMutation({
    mutationFn: async (newPeople: Omit<People, "id" | "createdOn">): Promise<People> => {
      const res = await fetch(PEOPLE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPeople),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "usePeople createPeople error: Failed to create person");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
    onError: (error) => {
      console.error("usePeople create error: ", error.message);
    },
  });

  // const update = useMutation({
  //   mutationFn: async (id:string, updatedPeople: Omit<People, "id" | "createdOn">): Promise<People> => {
  //     const res = await fetch(`${PEOPLE_URL}/${id}`, {
  //       method: "PUT",

  //     })
  //   }
  // })

  return { getAll, getById, create };
};
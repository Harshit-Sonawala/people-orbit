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
    mutationFn: async (createData: Omit<People, "id" | "createdOn" | "updatedOn">): Promise<People> => {
      const res = await fetch(PEOPLE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "usePeople create error: Failed to create person");
      return data;
    },
    onSuccess: (result, input) => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      console.log(`Created new person record: ${JSON.stringify(result)}`);
    },
    onError: (error) => {
      console.error("usePeople create error: ", error.message);
    },
  });

  const replaceById = useMutation({
    mutationFn: async ({ replaceId, replaceData }: { replaceId: string, replaceData: Omit<People, "id" | "createdOn" | "updatedOn"> }): Promise<People> => {
      const res = await fetch(`${PEOPLE_URL}/${replaceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(replaceData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `usePeople replace error: Failed to replace record for ID: ${replaceId}`);
      return data;
    },
    onSuccess: (result, input) => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      queryClient.invalidateQueries({ queryKey: ["peopleSingle", input.replaceId] });
      console.log(`Replaced person record at ID: ${input.replaceId} with data: ${JSON.stringify(result)}`);
    },
    onError: (error) => {
      console.error("usePeople replace error: ", error.message);
    },
  });

  // const update = useMutation({
  //   mutationFn: async (id:string, updatedPeople: Omit<People, "id" | "createdOn">): Promise<People> => {
  //     const res = await fetch(`${PEOPLE_URL}/${id}`, {
  //       method: "PUT",

  //     })
  //   }
  // })

  const deleteById = useMutation({
    mutationFn: async (deleteId: string): Promise<People> => {
      const res = await fetch(`${PEOPLE_URL}/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `usePeople replace error: Failed to replace record for ID: ${deleteId}`);
      return data;
    },
    onSuccess: (result, deleteId) => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      queryClient.invalidateQueries({ queryKey: ["peopleSingle", deleteId] });
      console.log(`Replaced person record at ID: ${deleteId} with data: ${JSON.stringify(result)}`);
    },
    onError: (error) => {
      console.error("usePeople replace error: ", error.message);
    },
  })

  return { getAll, getById, create, replaceById, deleteById };
};
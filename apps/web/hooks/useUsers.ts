import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, PaginatedUsers } from "@/types";

const USERS_URL = process.env.NEXT_PUBLIC_USERS_URL ?? "http://localhost:4000/api/users";

export const useUsers = (id?: string, page: number = 1, limit: number = 12, sortBy = "createdOn", order = "asc") => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ["users", page, limit, sortBy, order],
    queryFn: async (): Promise<PaginatedUsers> => {
      const res = await fetch(`${USERS_URL}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
      if (!res.ok) throw new Error("useUsers getAll error: Failed to fetch users");
      const data = await res.json();
      return data;
    },
  });

  const getById = useQuery({
    queryKey: ["user", id],
    queryFn: async (): Promise<User> => {
      const res = await fetch(`${USERS_URL}/${id}`);
      if (!res.ok) throw new Error("useUsers getById error: Failed to fetch person record");
      const data = await res.json();
      return data;
    },
    enabled: !!id, // dont try fetching until we have id. Force convert to boolean trick
  });

  const create = useMutation({
    mutationFn: async (createData: Omit<User, "id" | "createdOn" | "updatedOn">): Promise<User> => {
      const res = await fetch(USERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "useUsers create error: Failed to create person");
      return data;
    },
    onSuccess: (result, input) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(`Created new person record: ${JSON.stringify(result)}`);
    },
    onError: (error) => {
      console.error("useUsers create error: ", error.message);
    },
  });

  const replaceById = useMutation({
    mutationFn: async ({ replaceId, replaceData }: { replaceId: string, replaceData: Omit<User, "id" | "createdOn" | "updatedOn"> }): Promise<User> => {
      const res = await fetch(`${USERS_URL}/${replaceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(replaceData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `useUsers replace error: Failed to replace record for ID: ${replaceId}`);
      return data;
    },
    onSuccess: (result, input) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", input.replaceId] });
      console.log(`Replaced person record at ID: ${input.replaceId} with data: ${JSON.stringify(result)}`);
    },
    onError: (error) => {
      console.error("useUsers replace error: ", error.message);
    },
  });

  const updateById = useMutation({
    mutationFn: async ({ updateId, updateData }: { updateId: string, updateData: Omit<User, "id" | "createdOn" | "updatedOn"> }): Promise<User> => {
      const res = await fetch(`${USERS_URL}/${updateId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `useUsers update error: Failed to update record for ID: ${updateId}`);
      return data;
    },
    onSuccess: (result, input) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", input.updateId] });
      console.log(`Updated person record at ID: ${input.updateId} with data: ${JSON.stringify(result)}`);
    },
    onError: (error) => {
      console.error("useUsers update error: ", error.message);
    },
  });

  const deleteById = useMutation({
    mutationFn: async (deleteId: string): Promise<User> => {
      const res = await fetch(`${USERS_URL}/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `useUsers replace error: Failed to replace record for ID: ${deleteId}`);
      return data;
    },
    onSuccess: (result, deleteId) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", deleteId] });
      console.log(`Replaced person record at ID: ${deleteId} with data: ${JSON.stringify(result)}`);
    },
    onError: (error) => {
      console.error("useUsers replace error: ", error.message);
    },
  });

  return { getAll, getById, create, replaceById, updateById, deleteById };
};
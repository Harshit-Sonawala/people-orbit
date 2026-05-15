import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, PaginatedUsers } from "@/types";

const USERS_URL = process.env.NEXT_PUBLIC_USERS_URL ?? "http://localhost:4000/api/users";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const getAll = (
    page: number = 1,
    limit: number = 30,
    sortBy: string = "createdOn",
    order: string = "desc"
  ) => {
    const sortOptions = [
      { label: "Date Created", value: "createdOn" },
      { label: "Date Updated", value: "updatedOn" },
      { label: "First Name", value: "firstName" },
      { label: "Last Name", value: "lastName" },
    ];

    const currentSortByOption =
      sortOptions.find((option) => option.value === sortBy) || sortOptions[0];

    // return usersService(undefined, page, limit, currentSortByOption.value, order).getAll;
    return useQuery({
      queryKey: ["users", page, limit, currentSortByOption.value, order],
      queryFn: async (): Promise<PaginatedUsers> => {
        const res = await fetch(`${USERS_URL}?page=${page}&limit=${limit}&sortBy=${currentSortByOption.value}&order=${order}`);
        if (!res.ok) {
          throw new Error("useUsers getAll error: Failed to fetch users");
        }
        return await res.json();
      },
    });
  }

  const getById = (
    id: string
  ) => {
    return useQuery({
      queryKey: ["user", id],
      queryFn: async (): Promise<User> => {
        const res = await fetch(`${USERS_URL}/${id}`);
        if (!res.ok) throw new Error("useUsers getById error: Failed to fetch person record");

        return await res.json();
      },
      enabled: !!id, // dont try fetching until we have id. Force convert to boolean trick
    });
  }

  const search = (query: string = "", page: number = 1, limit: number = 30) => {
    return useQuery({
      queryKey: ["users", "search", query, page, limit],
      queryFn: async (): Promise<PaginatedUsers> => {
        const res = await fetch(`${USERS_URL}/search?q=${query}&page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("useUsers search error: Failed to fetch search results");
        const data = await res.json();
        return data;
      },
      enabled: !!query, // only search if we have the query
    });
  }

  const create = () => {
    return useMutation({
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
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        console.log(`Created new person record: ${JSON.stringify(result)}`);
      },
      onError: (error) => {
        console.error("useUsers create error: ", error.message);
      },
    });
  }

  const replaceById = () => {
    return useMutation({
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
  }

  const updateById = () => {
    return useMutation({
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
  }

  const deleteById = () => {
    return useMutation({
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
  }

  return { getAll, getById, search, create, replaceById, updateById, deleteById };
}
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, PaginatedUsers, UserStats } from "@/types";

const USERS_URL = "/api/users";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const getAll = (
    page: number = 1,
    limit: number = 30,
    sortBy: string = "createdAt",
    order: string = "desc",
  ) => {
    return useQuery({
      queryKey: ["users", page, limit, sortBy, order],
      queryFn: async (): Promise<PaginatedUsers> => {
        const { data } = await axios.get<PaginatedUsers>(USERS_URL, {
          params: { page, limit, sortBy, order },
        });
        return data;
      },
    });
  };

  const getById = (id: string) => {
    return useQuery({
      queryKey: ["user", id],
      queryFn: async (): Promise<User> => {
        const { data } = await axios.get<User>(`${USERS_URL}/${id}`);
        return data;
      },
      enabled: !!id, // dont try fetching until we have id. Force convert to boolean trick
    });
  };

  const search = (query: string = "", page: number = 1, limit: number = 30) => {
    return useQuery({
      queryKey: ["users", "search", query, page, limit],
      queryFn: async (): Promise<PaginatedUsers> => {
        const { data } = await axios.get<PaginatedUsers>(
          `${USERS_URL}/search`,
          {
            params: {
              q: query,
              page,
              limit,
            },
          },
        );
        return data;
      },
      enabled: !!query, // only search if we have the query
    });
  };

  const create = () => {
    return useMutation({
      mutationFn: async (
        createData: Omit<
          User,
          "id" | "createdAt" | "updatedAt" | "role" | "isBanned"
        >,
      ): Promise<User> => {
        const { data } = await axios.post<User>(USERS_URL, createData);
        return data;
      },
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        console.log(`Created new User record: ${JSON.stringify(result)}`);
      },
      onError: (error: any) => {
        console.error(
          "useUsers create error: ",
          error.response?.data?.message || error.message,
        );
      },
    });
  };

  const replaceById = () => {
    return useMutation({
      mutationFn: async ({
        replaceId,
        replaceData,
      }: {
        replaceId: string;
        replaceData: Omit<
          User,
          "id" | "createdAt" | "updatedAt" | "role" | "isBanned"
        >;
      }): Promise<User> => {
        const { data } = await axios.put<User>(
          `${USERS_URL}/${replaceId}`,
          replaceData,
        );
        return data;
      },
      onSuccess: (result, input) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["user", input.replaceId] });
        console.log(
          `Replaced User record at ID: ${input.replaceId} with data: ${JSON.stringify(result)}`,
        );
      },
      onError: (error: any) => {
        console.error(
          "useUsers replaceById error: ",
          error.response?.data?.message || error.message,
        );
      },
    });
  };

  const updateById = () => {
    return useMutation({
      mutationFn: async ({
        updateId,
        updateData,
      }: {
        updateId: string;
        updateData: Omit<
          User,
          "id" | "createdAt" | "updatedAt" | "role" | "isBanned"
        >;
      }): Promise<User> => {
        // const res = await fetch(`${USERS_URL}/${updateId}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(updateData),
        // });

        // const data = await res.json();
        // if (!res.ok)
        //   throw new Error(
        //     data.message ||
        //       `useUsers update error: Failed to update record for ID: ${updateId}`,
        //   );
        // return data;
        const { data } = await axios.patch<User>(
          `${USERS_URL}/${updateId}`,
          updateData,
        );
        return data;
      },
      onSuccess: (result, input) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["user", input.updateId] });
        console.log(
          `Updated User record at ID: ${input.updateId} with data: ${JSON.stringify(result)}`,
        );
      },
      onError: (error: any) => {
        console.error(
          "useUsers updateById error: ",
          error.response?.data?.message || error.message,
        );
      },
    });
  };

  const deleteById = () => {
    return useMutation({
      mutationFn: async (deleteId: string): Promise<User> => {
        // const res = await fetch(`${USERS_URL}/${deleteId}`, {
        //   method: "DELETE",
        // });

        // const data = await res.json();
        // if (!res.ok)
        //   throw new Error(
        //     data.message ||
        //       `useUsers replace error: Failed to replace record for ID: ${deleteId}`,
        //   );
        // return data;
        const { data } = await axios.delete<User>(`${USERS_URL}/${deleteId}`);
        return data;
      },
      onSuccess: (result, deleteId) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["user", deleteId] });
        console.log(
          `Replaced User record at ID: ${deleteId} with data: ${JSON.stringify(result)}`,
        );
      },
      onError: (error: any) => {
        console.error(
          "useUsers deleteById error: ",
          error.response?.data?.message || error.message,
        );
      },
    });
  };

  const getStats = () => {
    return useQuery({
      queryKey: ["users", "stats"],
      queryFn: async (): Promise<UserStats> => {
        const { data } = await axios.get<UserStats>(`${USERS_URL}/stats`);
        return data;
      },
    });
  };

  return {
    getAll,
    getById,
    search,
    create,
    replaceById,
    updateById,
    deleteById,
    getStats,
  };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { People } from "../types/People";

export const useCreatePeople = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPeople: Omit<People, "id" | "createdOn">): Promise<People> => {
      const res = await fetch(process.env.NEXT_PUBLIC_PEOPLE_URL ?? "http://localhost:4000/api/people",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPeople),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create person");
      }

      return data as People;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] }); // automatically refresh the data
    },
    onError: (error) => {
      console.error("useCreatePeople error:", error.message);
    },
  });
};

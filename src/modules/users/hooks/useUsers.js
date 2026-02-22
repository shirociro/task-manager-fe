import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  addUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "@/modules/users/services/users.service";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Users
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  // 2. Add User Mutation
  const addUserMutation = useMutation({
    mutationFn: addUserAPI,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old = []) => [...old, newUser]);
    },
  });

  // 3. Update User Mutation
  const updateUserMutation = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (old = []) =>
        old.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    },
  });

  // 4. Delete User Mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUserAPI,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["users"], (old = []) =>
        old.filter((u) => u.id !== deletedId)
      );
    },
  });

  return {
    users,
    isLoading,
    isError,
    // Direct mutate functions for a simpler API in your components
    addUser: addUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  };
};
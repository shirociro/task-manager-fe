import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  addUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "@/modules/users/services/users.service";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Add users
  const addUser = useMutation({
    mutationFn: addUserAPI,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old = []) => [...old, newUser]);
    },
  });

  // Update users
  const updateUser = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (old = []) =>
        old.map((t) => (t.id === updatedUser.id ? updatedUser : t)),
      );
    },
  });

  // Delete users
  const deleteUser = useMutation({
    mutationFn: deleteUserAPI,
    onSuccess: (id) => {
      queryClient.setQueryData(["users"], (old = []) =>
        old.filter((t) => t.id !== id),
      );
    },
  });

  return {
    users,
    isLoading,
    isError,
    addUser,
    updateUser,
    deleteUser,
  };
};

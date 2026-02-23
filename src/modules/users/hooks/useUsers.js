import { useState, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  addUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "@/modules/users/services/users.service";

export const useUsers = () => {
  const queryClient = useQueryClient();
  const timeoutRef = useRef(null);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = useCallback((message, type = "success") => {
    setAlert({ show: true, message, type });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setAlert({ show: false, message: "", type: "success" }),
      3000,
    );
  }, []);

  /* 1. FETCH USERS - trust cache completely while offline */
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  /* 2. SHARED OPTIMISTIC LOGIC */
  const updateLocalCache = async (updateFn) => {
    await queryClient.cancelQueries({ queryKey: ["users"] });
    const previous = queryClient.getQueryData(["users"]);
    queryClient.setQueryData(["users"], updateFn);
    return { previous };
  };

  /* 3. ADD USER */
  const addUserMutation = useMutation({
    mutationFn: addUserAPI,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old = []) => [...old, newUser]);
      showAlert("User added!", "success");
    },
  });

  /* 4. UPDATE USER */
  const updateUserMutation = useMutation({
    mutationFn: updateUserAPI,
    networkMode: "offlineFirst",
    onMutate: async (updatedUser) =>
      updateLocalCache((old = []) =>
        old.map((u) =>
          u.id === updatedUser.id ? { ...u, ...updatedUser } : u,
        ),
      ),
    onError: (err, _, context) => {
      if (navigator.onLine && context?.previous) {
        queryClient.setQueryData(["users"], context.previous);
        showAlert("Update failed", "destructive");
      }
    },
    onSuccess: () => showAlert("User updated!"),
    onSettled: () => {
      if (navigator.onLine && queryClient.isMutating() === 0) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });

  /* 5. DELETE USER */
  const deleteUserMutation = useMutation({
    mutationFn: deleteUserAPI,
    onMutate: (id) =>
      updateLocalCache((old = []) => old.filter((u) => u.id !== id)),
    onError: (err, _, context) => {
      if (navigator.onLine && context?.previous)
        queryClient.setQueryData(["users"], context.previous);
      showAlert("Delete failed", "destructive");
    },
    onSuccess: () => showAlert("User deleted!", "destructive"),
    onSettled: () => {
      if (navigator.onLine)
        queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    users,
    isLoading,
    isError,
    alert,
    setAlert,
    addUser: addUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  };
};

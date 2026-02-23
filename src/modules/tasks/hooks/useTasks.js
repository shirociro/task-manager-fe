import { useState, useCallback, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "@/modules/tasks/services/tasks.service";

export const useTasks = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const timeoutRef = useRef(null);

  const showAlert = useCallback((message, type = "success") => {
    setAlert({ show: true, message, type });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setAlert({ show: false, message: "", type: "success" }),
      3000,
    );
  }, []);

  /* 1. FETCH - Trust the cache completely while offline */
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: Infinity,
    refetchOnReconnect: false, // Prevents the snap-back on reconnect
    refetchOnWindowFocus: false,
  });

  /* 2. SHARED OPTIMISTIC LOGIC */
  const updateLocalCache = async (updateFn) => {
    // 1. Cancel any outgoing refetches so they don't overwrite us
    await queryClient.cancelQueries({ queryKey: ["tasks"] });
    // 2. Snapshot the current data
    const previous = queryClient.getQueryData(["tasks"]);
    // 3. Optimistically update the cache
    queryClient.setQueryData(["tasks"], updateFn);
    return { previous };
  };

  /* 3. ADD TASK */
  const addTaskMutation = useMutation({
    mutationFn: addTaskAPI,
    onMutate: (newTask) =>
      updateLocalCache((old = []) => [
        ...old,
        { ...newTask, id: crypto.randomUUID(), isOptimistic: true },
      ]),
    onError: (err, _, context) => {
      if (navigator.onLine)
        queryClient.setQueryData(["tasks"], context.previous);
    },
    onSettled: () => {
      if (navigator.onLine)
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  /* 4. UPDATE TASK (The Fix is here) */
  const updateTaskMutation = useMutation({
    mutationFn: updateTaskAPI,
    // Ensure we tell the mutation to wait if offline
    networkMode: "offlineFirst",
    onMutate: async (updatedTask) => {
      return await updateLocalCache((old = []) =>
        old.map((t) =>
          t.id === updatedTask.id ? { ...t, ...updatedTask } : t,
        ),
      );
    },
    onSuccess: () => showAlert("Successfully updated Task", "success"),
    onError: (err, _, context) => {
      // If we're offline, DON'T rollback. Only rollback on a real server 400/500 error.
      if (navigator.onLine && context?.previous) {
        queryClient.setQueryData(["tasks"], context.previous);
        showAlert("Update failed", "destructive");
      }
    },
    onSettled: (data, error, variables) => {
      // Only refresh if we aren't waiting for other updates to finish
      if (navigator.onLine && queryClient.isMutating() === 0) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });

  /* 5. DELETE TASK */
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAPI,
    onMutate: (id) =>
      updateLocalCache((old = []) => old.filter((t) => t.id !== id)),
    onSettled: () => {
      if (navigator.onLine)
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onSuccess: () => showAlert("Successfully deleted Task", "success"),
  });

  return {
    tasks,
    isLoading,
    alert,
    setAlert,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};

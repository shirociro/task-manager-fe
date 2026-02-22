import { useState, useCallback } from "react";
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

  const showAlert = useCallback((message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(
      () => setAlert({ show: false, message: "", type: "success" }),
      3000,
    );
  }, []);
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: 30000, // Consider data "fresh" for 30 seconds
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const addTaskMutation = useMutation({
    mutationFn: addTaskAPI,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (old = []) => [...old, newTask]);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTaskAPI,
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);

      // Update the cache immediately
      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((t) =>
          t.id === updatedTask.id ? { ...t, ...updatedTask } : t,
        ),
      );
      showAlert("Task updated!", "success");
      return { previousTasks };
    },
    onError: (err, updatedTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
      showAlert("Could not sync with server", "destructive");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAPI,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(["tasks"], (old = []) =>
        old.filter((t) => t.id !== deletedId),
      );
      showAlert("Task deleted", "destructive");
      return { previousTasks };
    },
    onError: (err, deletedId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
      showAlert("Error deleting task", "destructive");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    tasks,
    isLoading,
    isError,
    alert,
    setAlert,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};

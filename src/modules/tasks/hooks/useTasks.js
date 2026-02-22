import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "@/modules/tasks/services/tasks.service";

export const useTasks = () => {
  const queryClient = useQueryClient();

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
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAPI,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["tasks"], (old = []) =>
        old.filter((t) => t.id !== deletedId)
      );
    },
  });

  return {
    tasks,
    isLoading,
    isError,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};
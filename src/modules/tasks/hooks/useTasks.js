import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, addTaskAPI, updateTaskAPI, deleteTaskAPI } from "@/modules/tasks/services/tasks.service";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Add task
  const addTask = useMutation({
    mutationFn: addTaskAPI,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (old = []) => [...old, newTask]);
    },
  });

  // Update task
  const updateTask = useMutation({
    mutationFn: updateTaskAPI,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    },
  });

  // Delete task
  const deleteTask = useMutation({
    mutationFn: deleteTaskAPI,
    onSuccess: (id) => {
      queryClient.setQueryData(["tasks"], (old = []) => old.filter((t) => t.id !== id));
    },
  });

  return {
    tasks,
    isLoading,
    isError,
    addTask,
    updateTask,
    deleteTask,
  };
};

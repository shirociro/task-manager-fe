// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchTasks,
//   addTaskAPI,
//   updateTaskAPI,
//   deleteTaskAPI,
// } from "@/modules/tasks/services/tasks.service";

// export const useTasks = () => {
//   const queryClient = useQueryClient();

//   // Fetch tasks
//   const {
//     data: tasks = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: fetchTasks,
//   });

//   // Add task
//   const addTask = useMutation({
//     mutationFn: addTaskAPI,
//     onSuccess: (newTask) => {
//       queryClient.setQueryData(["tasks"], (old = []) => [...old, newTask]);
//     },
//   });

//   // Update task
//   const updateTask = useMutation({
//     mutationFn: updateTaskAPI,
//     onSuccess: (updatedTask) => {
//       queryClient.setQueryData(["tasks"], (old = []) =>
//         old.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
//       );
//     },
//   });

//   // Delete task
//   const deleteTask = useMutation({
//     mutationFn: deleteTaskAPI,
//     onSuccess: (id) => {
//       queryClient.setQueryData(["tasks"], (old = []) =>
//         old.filter((t) => t.id !== id),
//       );
//     },
//   });

//   return {
//     tasks,
//     isLoading,
//     isError,
//     addTask,
//     updateTask,
//     deleteTask,
//   };
// };

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "@/modules/tasks/services/tasks.service";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // 1. Fetch tasks with "Circuit Breaker" settings
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    // --- SAFETY SETTINGS TO PREVENT RENDER CRASHES ---
    staleTime: 30000, // Consider data "fresh" for 30 seconds
    refetchOnWindowFocus: false, // Stop fetching every time you switch tabs
    retry: 1, // Only retry once if the Render API is sleepy
  });

  // 2. Add task
  const addTaskMutation = useMutation({
    mutationFn: addTaskAPI,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (old = []) => [...old, newTask]);
    },
  });

  // 3. Update task
  const updateTaskMutation = useMutation({
    mutationFn: updateTaskAPI,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    },
  });

  // 4. Delete task
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskAPI,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["tasks"], (old = []) =>
        old.filter((t) => t.id !== deletedId)
      );
    },
  });

  // RETURN FUNCTIONS DIRECTLY
  // This ensures your component calls deleteTask(id) instead of deleteTask.mutate(id)
  return {
    tasks,
    isLoading,
    isError,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    // Optional: expose loading states for buttons
    isAdding: addTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};
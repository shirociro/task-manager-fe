let fakeTasks = [
  { id: 1, title: "This is a sample task title", completed: false },
  { id: 2, title: "Sample Task", completed: true },
];

export const fetchTasks = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve([...fakeTasks]), 500); // simulate network delay
  });

export const addTaskAPI = (task) =>
  new Promise((resolve) => {
    const newTask = { ...task, id: Date.now() };
    fakeTasks.push(newTask);
    setTimeout(() => resolve(newTask), 500);
  });

export const updateTaskAPI = (updatedTask) =>
  new Promise((resolve) => {
    fakeTasks = fakeTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    setTimeout(() => resolve(updatedTask), 500);
  });

export const deleteTaskAPI = (id) =>
  new Promise((resolve) => {
    fakeTasks = fakeTasks.filter((t) => t.id !== id);
    setTimeout(() => resolve(id), 500);
  });


// modules/tasks/services/tasks.service.js
// import { api } from "@/api/axios";

// // Fetch all tasks
// export const fetchTasks = async () => {
//   const { data } = await api.get("/tasks"); // GET /tasks
//   return data;
// };

// // Add a task
// export const addTaskAPI = async (task) => {
//   const { data } = await api.post("/tasks", task); // POST /tasks
//   return data;
// };

// // Update a task
// export const updateTaskAPI = async (task) => {
//   const { data } = await api.put(`/tasks/${task.id}`, task); // PUT /tasks/:id
//   return data;
// };

// // Delete a task
// export const deleteTaskAPI = async (id) => {
//   await api.delete(`/tasks/${id}`); // DELETE /tasks/:id
//   return id;
// };

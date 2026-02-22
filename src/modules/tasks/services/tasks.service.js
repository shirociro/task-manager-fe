import api from "@/api/axios";

export const fetchTasks = async () => {
  const { data } = await api.get("/api/tasks");
  return data;
};

export const addTaskAPI = async (task) => {
  const { data } = await api.post("/api/tasks", task);
  return data;
};

export const updateTaskAPI = async (task) => {
  const { data } = await api.put(`/api/tasks/${task.id}`, task);
  return data;
};

export const deleteTaskAPI = async (id) => {
  await api.delete(`/api/tasks/${id}`);
  return id;
};

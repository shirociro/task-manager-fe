import api from "@/api/axios";

export const fetchUsers = async () => {
  const { data } = await api.get("/api/users");
  return data;
};

export const addUserAPI = async (user) => {
  const { data } = await api.post("/api/users", user);
  return data;
};

export const updateUserAPI = async (user) => {
  const { data } = await api.put(`/api/users/${user.id}`, user);
  return data;
};

export const deleteUserAPI = async (id) => {
  await api.delete(`/api/users/${id}`);
  return id;
};

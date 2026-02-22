// let fakeUsers = [
//   { id: 1, name: "Rico Carbonel", password: "samplePassword123" },
//   { id: 2, name: "Ciro Reyes", password: "samplePassword123" },
// ];

// export const fetchUsers = () =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve([...fakeUsers]), 500); // simulate network delay
//   });

// export const addUserAPI = (user) =>
//   new Promise((resolve) => {
//     const newUser = { ...user, id: Date.now() };
//     fakeUsers.push(newUser);
//     setTimeout(() => resolve(newUser), 500);
//   });

// export const updateUserAPI = (updatedUser) =>
//   new Promise((resolve) => {
//     fakeUsers = fakeUsers.map((t) =>
//       t.id === updatedUser.id ? updatedUser : t,
//     );
//     setTimeout(() => resolve(updatedUser), 500);
//   });

// export const deleteUserAPI = (id) =>
//   new Promise((resolve) => {
//     fakeUsers = fakeUsers.filter((t) => t.id !== id);
//     setTimeout(() => resolve(id), 500);
//   });

// modules/users/services/users.service.js
// import { api } from "@/api/axios";

// // Fetch all users
// export const fetchUsers = async () => {
//   const { data } = await api.get("/users"); // GET /users
//   return data;
// };

// // Add a user
// export const addUserAPI = async (user) => {
//   const { data } = await api.post("/users", user); // POST /users
//   return data;
// };

// // Update a user
// export const updateUserAPI = async (user) => {
//   const { data } = await api.put(`/users/${user.id}`, user); // PUT /users/:id
//   return data;
// };

// // Delete a user
// export const deleteUserAPI = async (id) => {
//   await api.delete(`/users/${id}`); // DELETE /users/:id
//   return id;
// };

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
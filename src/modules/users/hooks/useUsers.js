let fakeUsers = [
  { id: 1, name: "Rico", password: "samplePassword123" },
  { id: 2, name: "Ciro", password: "samplePassword123" },
];

export const fetchUsers = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve([...fakeUsers]), 500); // simulate network delay
  });

export const addUserAPI = (user) =>
  new Promise((resolve) => {
    const newUser = { ...user, id: Date.now() };
    fakeUsers.push(newUser);
    setTimeout(() => resolve(newUser), 500);
  });

export const updateUserAPI = (updatedUser) =>
  new Promise((resolve) => {
    fakeUsers = fakeUsers.map((t) => (t.id === updatedUser.id ? updatedUser : t));
    setTimeout(() => resolve(updatedUser), 500);
  });

export const deleteUserAPI = (id) =>
  new Promise((resolve) => {
    fakeUsers = fakeUsers.filter((t) => t.id !== id);
    setTimeout(() => resolve(id), 500);
  });
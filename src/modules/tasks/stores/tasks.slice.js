import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { id: 1, title: "This is a sample task title", completed: false },
    { id: 2, title: "Sample Task", completed: true },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.data.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.data.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.data = state.data.filter((t) => t.id !== action.payload);
    },
    toggleCompleted: (state, action) => {
      const task = state.data.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleCompleted } =
  tasksSlice.actions;
export default tasksSlice.reducer;

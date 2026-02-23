// modules/tasks/stores/tasks.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isOffline: !navigator.onLine,
  pendingMutations: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export const {} = tasksSlice.actions;

export default tasksSlice.reducer;

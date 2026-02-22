import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/modules/tasks/stores/tasks.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;

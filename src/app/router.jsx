import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import { AdminLayout } from "@/layouts/AdminLayout";

// Pages
import { TasksPage } from "@/modules/tasks";
import { UsersPage } from "@/modules/users";

export const AppRouter = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      <Route index element={<Navigate to="tasks" replace />} />

      <Route path="tasks" element={<TasksPage />} />
      <Route path="users" element={<UsersPage />} />
    </Route>

    <Route path="*" element={<Navigate to="/tasks" replace />} />
  </Routes>
);

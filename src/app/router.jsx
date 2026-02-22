import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import { AdminLayout } from "@/layouts/AdminLayout";

// Pages
import { TasksPage } from "@/modules/tasks";
import { UsersPage } from "@/modules/users";

export const AppRouter = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Route>

    {/* FALLBACK */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

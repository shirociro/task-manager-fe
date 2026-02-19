import { Outlet } from "react-router-dom";

export const AdminLayout = () => (
  <div className="min-h-screen w-full bg-white dark:bg-gray-900">
    <main className="w-full p-2">
      <Outlet />
    </main>
  </div>
);

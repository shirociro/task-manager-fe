import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/shared/components/Sidebar"; 

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppSidebar />

      {/* The ml-[70px] keeps content safe while sidebar is collapsed.
        The content doesn't "jump" when sidebar expands because sidebar is absolute/fixed.
      */}
      <main className="flex-1 ml-[70px] p-8 overflow-auto">
        <div className="max-w-7xl mx-auto mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
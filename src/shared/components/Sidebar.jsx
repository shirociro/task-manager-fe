import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineUsers,
  HiOutlineViewList,
  HiOutlineLogout,
  HiMenuAlt2,
  HiX,
} from "react-icons/hi";

export const AppSidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hoverTimer = useRef(null);
  const leaveTimer = useRef(null);

  const items = [
    { path: "/tasks", icon: HiOutlineViewList, label: "Tasks" },
    { path: "/users", icon: HiOutlineUsers, label: "Users" },
  ];

  const startHoverTimer = () => {
    if (window.innerWidth < 1024) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    hoverTimer.current = setTimeout(() => setIsHovered(true), 200);
  };

  const startLeaveTimer = () => {
    if (window.innerWidth < 1024) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    leaveTimer.current = setTimeout(() => setIsHovered(false), 200);
  };

  return (
    <>
      {/* MOBILE TRIGGER */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-[#1e1e2f] text-white rounded-lg shadow-md"
        >
          <HiMenuAlt2 size={24} />
        </button>
      )}

      {/* OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[45] lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-[50] h-screen bg-[#1e1e2f] flex flex-col pt-5
          transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileOpen ? "translate-x-0 w-[240px]" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          width:
            window.innerWidth >= 1024
              ? isHovered
                ? "200px"
                : "70px"
              : isMobileOpen
                ? "240px"
                : "0px",
        }}
        onMouseEnter={startHoverTimer}
        onMouseLeave={startLeaveTimer}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end px-4 mb-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="text-gray-400"
          >
            <HiX size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-1 px-3">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center h-12 transition-all duration-200 group no-underline
                ${isActive ? "text-blue-500" : "text-white hover:text-gray-400"}
              `}
              style={{ textDecoration: "none" }}
            >
              <div className="min-w-[46px] flex items-center justify-center text-xl transition-colors">
                <item.icon />
              </div>

              <span
                className={`
                whitespace-nowrap transition-opacity duration-300 text-sm font-medium no-underline
                ${isHovered || isMobileOpen ? "opacity-100 ml-2" : "opacity-0"}
              `}
              >
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
};

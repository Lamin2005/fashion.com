// src/pages/admin/SideBar.jsx
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  X,
} from "lucide-react";

export default function SideBar({ mobileOpen = false, onClose = () => {} }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const menuGroups = [
    {
      groupLabel: "Main",
      items: [
        {
          path: "/admin",
          label: "Dashboard",
          icon: LayoutDashboard,
          end: true,
        },
        {
          path: "/admin/products",
          label: "Products",
          icon: ShoppingBag,
          badge: "128",
        },
        {
          path: "/admin/orders",
          label: "Orders",
          icon: ShoppingCart,
          badge: "5 New",
          badgeColor: "bg-amber-500 text-zinc-950 font-bold",
        },
        {
          path: "/admin/customers",
          label: "Customers",
          icon: Users,
        },
      ],
    },
    {
      groupLabel: "Management",
      items: [
        { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
        {
          path: "/admin/notifications",
          label: "Notifications",
          icon: Bell,
          badge: "3",
        },
        { path: "/admin/settings", label: "Settings", icon: Settings },
      ],
    },
  ];

  // Shared class helpers so mobile stays expanded while lg can collapse
  const hideWhenCollapsed = isCollapsed ? "lg:hidden" : "";

  return (
    <aside
      aria-label="Admin navigation"
      className={`
        fixed inset-y-0 left-0 z-50 flex h-full w-72 shrink-0 flex-col
        border-r border-zinc-800/80 bg-zinc-950 text-zinc-400
        shadow-2xl shadow-black/50 select-none
        transition-[transform,width] duration-300 ease-in-out
        lg:static lg:z-auto lg:h-full lg:translate-x-0 lg:shadow-none
        ${isCollapsed ? "lg:w-24" : "lg:w-72"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* ---------- Collapse toggle (desktop only) ---------- */}
      <button
        type="button"
        onClick={() => setIsCollapsed((v) => !v)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-9 z-30 hidden h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 shadow-md transition-colors hover:border-amber-400/60 hover:text-amber-400 lg:flex"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* ---------- Header ---------- */}
      <div
        className={`
          flex h-20 shrink-0 items-center gap-3 border-b border-zinc-900 px-5
          ${isCollapsed ? "lg:justify-center lg:gap-0 lg:px-0" : ""}
        `}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-serif text-lg font-bold text-zinc-950 shadow-sm">
          P
        </div>

        <div className={`min-w-0 flex-1 overflow-hidden ${hideWhenCollapsed}`}>
          <h1 className="truncate font-serif text-base font-semibold uppercase tracking-wider text-white">
            Fashion.com
          </h1>
          <p className="truncate font-mono text-[11px] uppercase tracking-widest text-amber-500">
            Admin Panel
          </p>
        </div>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav
        className="
          flex-1 space-y-8 overflow-y-auto px-3 py-5
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-zinc-800
          hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700
        "
      >
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1.5">
            <p
              className={`
                mb-3 px-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-600
                ${hideWhenCollapsed}
              `}
            >
              {group.groupLabel}
            </p>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `
                    group relative flex items-center gap-3 rounded-xl px-3.5 py-3
                    text-sm font-medium transition-all duration-200
                    ${isCollapsed ? "lg:justify-center lg:gap-0 lg:px-0" : ""}
                    ${
                      isActive
                        ? "bg-zinc-800/90 text-white shadow-sm"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active accent bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-amber-400" />
                      )}

                      <Icon
                        size={20}
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-amber-400"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      />

                      <span
                        className={`truncate tracking-wide ${hideWhenCollapsed}`}
                      >
                        {item.label}
                      </span>

                      {item.badge && (
                        <span
                          className={`
                            ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] leading-none
                            ${
                              item.badgeColor ||
                              "border border-zinc-700 bg-zinc-800 text-zinc-400"
                            }
                            ${hideWhenCollapsed}
                          `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ---------- Footer ---------- */}
      <div className="shrink-0 space-y-2 border-t border-zinc-900 p-4">
        <div
          className={`
            flex items-center gap-3 rounded-xl border border-zinc-900 bg-zinc-900/50 p-2.5
            ${isCollapsed ? "lg:justify-center lg:gap-0 lg:p-2" : ""}
          `}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold text-white">
            AD
          </div>

          <div className={`min-w-0 flex-1 overflow-hidden ${hideWhenCollapsed}`}>
            <p className="truncate text-sm font-medium text-white">
              Administrator
            </p>
            <p className="truncate text-xs text-zinc-500">
              admin@fashion.com
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`
            flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium
            text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400
            ${isCollapsed ? "lg:justify-center lg:gap-0 lg:px-0" : ""}
          `}
        >
          <LogOut size={20} className="shrink-0" />
          <span className={hideWhenCollapsed}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
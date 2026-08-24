import { useState } from "react";
import { NavLink } from "react-router-dom";
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
} from "lucide-react";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        { path: "/admin/customers", label: "Customers", icon: Users },
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

  return (
    <aside
      className={`relative h-screen  top-0 bg-zinc-950 text-zinc-400 border-r border-zinc-800/80 transition-all duration-300 flex flex-col justify-between shrink-0 select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white p-1 rounded-full shadow-md transition-colors z-30"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Top Header & Links */}
      <div>
        {/* Brand Logo Header */}
        <div
          className={`h-20 flex items-center border-b border-zinc-900 px-6 ${isCollapsed ? "justify-center" : "justify-start gap-3"}`}
        >
          <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-serif font-bold text-base shrink-0 shadow-sm">
            P
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-semibold text-white tracking-wider uppercase font-serif">
                Fashion.com
              </h1>
              <p className="text-[10px] text-amber-500 tracking-widest uppercase font-mono">
                Admin Panel
              </p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2">
                  {group.groupLabel}
                </p>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-zinc-800 text-white shadow-sm border-l-2 border-amber-400"
                          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon
                            size={18}
                            className={
                              isActive ? "text-amber-400" : "text-zinc-400"
                            }
                          />
                          {!isCollapsed && (
                            <span className="tracking-wide">{item.label}</span>
                          )}
                        </div>

                        {!isCollapsed && item.badge && (
                          <span
                            className={`px-2 py-0.5 text-[10px] rounded-full ${item.badgeColor || "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}
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
        </div>
      </div>

      {/* Bottom Admin User & Logout */}
      <div className="p-4 border-t border-zinc-900 space-y-2">
        <div
          className={`flex items-center gap-3 p-2 rounded-xl bg-zinc-900/50 border border-zinc-900 ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium text-white shrink-0">
            AD
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden min-w-0 flex-1">
              <p className="text-xs font-medium text-white truncate">
                Administrator
              </p>
              <p className="text-[10px] text-zinc-500 truncate">
                admin@fashion.com
              </p>
            </div>
          )}
        </div>

        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors ${isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut size={16} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

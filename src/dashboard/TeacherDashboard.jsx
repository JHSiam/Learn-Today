import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaPlus, FaChalkboard, FaUser } from "react-icons/fa";

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const navItems = [
    { to: "add-class",  icon: <FaPlus size={16} />,      label: "Add Class"   },
    { to: "my-classes", icon: <FaChalkboard size={16} />, label: "My Classes"  },
    { to: "profile",    icon: <FaUser size={16} />,       label: "Profile"     },
  ];

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div
        className="p-5 flex items-center gap-3"
        style={{ borderBottom: "1px solid rgba(139,92,246,0.15)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#a855f7)",
            boxShadow: "0 0 16px rgba(168,85,247,0.5)",
          }}
        >
          {/* Chalkboard / teacher icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="14" rx="2" fill="white" fillOpacity="0.9" />
            <path d="M8 21h8M12 17v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 8l3 3 5-5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="min-w-0">
          <p
            className="text-sm font-bold tracking-wide leading-tight"
            style={{ color: "#e9d5ff", letterSpacing: "0.04em" }}
          >
            Teacher Portal
          </p>
          <p className="text-xs" style={{ color: "rgba(167,139,250,0.45)" }}>
            Instructor Dashboard
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 pt-5">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3 px-3"
          style={{ color: "rgba(167,139,250,0.4)" }}
        >
          Menu
        </p>
        <ul className="space-y-1">
          {navItems.map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={({ isActive }) =>
                  isActive
                    ? {
                        background:
                          "linear-gradient(135deg,rgba(124,58,237,0.35),rgba(168,85,247,0.2))",
                        color: "#c4b5fd",
                        boxShadow:
                          "inset 0 0 0 1px rgba(139,92,246,0.4),0 0 12px rgba(124,58,237,0.15)",
                      }
                    : { color: "rgba(196,181,253,0.5)" }
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 shrink-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg,#7c3aed,#a855f7)"
                          : "rgba(139,92,246,0.1)",
                        color: isActive ? "white" : "rgba(167,139,250,0.55)",
                        boxShadow: isActive ? "0 0 10px rgba(168,85,247,0.4)" : "none",
                      }}
                    >
                      {icon}
                    </span>
                    <span>{label}</span>
                    {isActive && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#a855f7", boxShadow: "0 0 6px #a855f7" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="p-4" style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}>
        <div
          className="rounded-xl p-3 flex items-center gap-3"
          style={{
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(139,92,246,0.12)",
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#6d28d9,#9333ea)" }}
          >
            <FaUser size={11} color="white" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: "#c4b5fd" }}>
              Teacher
            </p>
            <p className="text-xs truncate" style={{ color: "rgba(167,139,250,0.45)" }}>
              Instructor
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen" style={{ background: "#0f0a1e" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0"
        style={{
          background: "linear-gradient(180deg,#1a0f3c 0%,#120b2e 100%)",
          borderRight: "1px solid rgba(139,92,246,0.15)",
          boxShadow: "4px 0 24px rgba(109,40,217,0.12)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── MOBILE BACKDROP ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "rgba(9,4,20,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <aside
        className="fixed top-0 left-0 h-full z-40 flex flex-col w-72 lg:hidden transition-transform duration-300 ease-in-out"
        style={{
          background: "linear-gradient(180deg,#1a0f3c 0%,#120b2e 100%)",
          borderRight: "1px solid rgba(139,92,246,0.2)",
          boxShadow: sidebarOpen ? "8px 0 40px rgba(109,40,217,0.35)" : "none",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.2)",
            color: "rgba(196,181,253,0.7)",
          }}
          aria-label="Close menu"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
        <SidebarContent />
      </aside>

      {/* ── RIGHT SIDE ── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* ── MOBILE TOPBAR ── */}
        <header
          className="flex lg:hidden items-center gap-3 px-4 py-3 shrink-0"
          style={{
            background: "linear-gradient(90deg,#1a0f3c,#120b2e)",
            borderBottom: "1px solid rgba(139,92,246,0.15)",
            boxShadow: "0 2px 16px rgba(109,40,217,0.15)",
          }}
        >
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 shrink-0"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
            aria-label="Open menu"
          >
            <span className="block rounded-full" style={{ width: "16px", height: "1.5px", background: "#c4b5fd" }} />
            <span className="block rounded-full" style={{ width: "12px", height: "1.5px", background: "#c4b5fd", alignSelf: "flex-start", marginLeft: "2px" }} />
            <span className="block rounded-full" style={{ width: "16px", height: "1.5px", background: "#c4b5fd" }} />
          </button>

          {/* Brand in topbar */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                boxShadow: "0 0 10px rgba(168,85,247,0.45)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="14" rx="2" fill="white" fillOpacity="0.9" />
                <path d="M8 21h8M12 17v4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span
              className="text-sm font-bold tracking-wide"
              style={{ color: "#e9d5ff", letterSpacing: "0.04em" }}
            >
              Teacher Portal
            </span>
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main
          className="flex-1 overflow-auto p-4 lg:p-8 relative"
          style={{
            background: "linear-gradient(135deg,#0f0a1e 0%,#130d26 50%,#0f0a1e 100%)",
          }}
        >
          {/* Grid texture */}
          <div
            className="pointer-events-none fixed inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
              zIndex: 0,
            }}
          />
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
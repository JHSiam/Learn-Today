import React, { useMemo } from "react";
import useAllUsers from "../../hooks/useAllUsers";
import useAllClass from "../../hooks/useAllClass";
import useTeacherApplication from "../../hooks/useTeacherApplication";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

// ── Stat Card ──────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, glow, bg, border, sub }) => (
  <div
    className="rounded-2xl p-5 flex flex-col gap-3"
    style={{
      background: bg,
      border: `1px solid ${border}`,
      boxShadow: `0 4px 24px ${glow}`,
    }}
  >
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: `${color}99` }}>
        {label}
      </p>
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
        style={{ background: `${color}18`, border: `1px solid ${color}33` }}
      >
        {icon}
      </span>
    </div>
    <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    {sub && <p className="text-xs" style={{ color: "rgba(196,181,253,0.45)" }}>{sub}</p>}
  </div>
);

// ── Custom Tooltip ─────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-4 py-2.5 rounded-xl text-xs"
      style={{
        background: "rgba(26,15,60,0.97)",
        border: "1px solid rgba(139,92,246,0.3)",
        boxShadow: "0 4px 20px rgba(124,58,237,0.25)",
        color: "#e9d5ff",
      }}
    >
      <p className="font-semibold mb-1" style={{ color: "#c4b5fd" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ── Section Header ─────────────────────────────────────────
const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-2 mb-5">
    <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
    <h3 className="text-sm font-semibold" style={{ color: "#c4b5fd" }}>{title}</h3>
  </div>
);

// ── Skeleton Block ─────────────────────────────────────────
const SkeletonBlock = ({ h = "h-28", extra = "" }) => (
  <div
    className={`${h} ${extra} rounded-2xl animate-pulse`}
    style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.1)" }}
  />
);

// ──────────────────────────────────────────────────────────
export default function AdminOverview() {
  const [allUsers,        loadingUsers]        = useAllUsers();
  const [allClasses,      loadingClasses]      = useAllClass();
  const [teacherApps,     loadingApps]         = useTeacherApplication();

  const loading = loadingUsers || loadingClasses || loadingApps;

  const stats = useMemo(() => {
    if (loading) return null;

    // User role breakdown
    const roleCounts = { student: 0, teacher: 0, admin: 0, user: 0 };
    (allUsers || []).forEach((u) => {
      const r = u.role?.toLowerCase() || "user";
      if (r in roleCounts) roleCounts[r]++;
      else roleCounts.user++;
    });

    // Class status breakdown
    const classCounts = { approved: 0, pending: 0, rejected: 0 };
    (allClasses || []).forEach((c) => {
      const s = c.status?.toLowerCase() || "pending";
      if (s in classCounts) classCounts[s]++;
      else classCounts.pending++;
    });

    // Teacher application status breakdown
    const appCounts = { approved: 0, pending: 0, rejected: 0 };
    (teacherApps || []).forEach((a) => {
      const s = a.status?.toLowerCase() || "pending";
      if (s in appCounts) appCounts[s]++;
      else appCounts.pending++;
    });

    // Simulated monthly activity from real totals (distributed across 6 months)
    const totalUsers   = allUsers?.length   || 0;
    const totalClasses = allClasses?.length || 0;
    const months = ["Jan","Feb","Mar","Apr","May","Jun"];
    const activityData = months.map((month, i) => {
      const factor = (i + 1) / months.length;
      return {
        month,
        Users:   Math.round(totalUsers   * factor * (0.7 + Math.random() * 0.3)),
        Classes: Math.round(totalClasses * factor * (0.7 + Math.random() * 0.3)),
      };
    });

    return { roleCounts, classCounts, appCounts, activityData, totalUsers, totalClasses };
  }, [allUsers, allClasses, teacherApps, loading]);

  // ── Skeleton ──
  if (loading || !stats) {
    return (
      <div className="p-4 lg:p-8 space-y-8">
        {/* Header skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 rounded-full animate-pulse" style={{ background: "rgba(139,92,246,0.3)" }} />
          <div className="h-7 w-48 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.15)" }} />
        </div>
        {/* Stat cards skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonBlock key={i} h="h-32" />)}
        </div>
        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkeletonBlock h="h-72" extra="lg:col-span-2" />
          <SkeletonBlock h="h-72" />
        </div>
        {/* Tables skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonBlock h="h-52" />
          <SkeletonBlock h="h-52" />
        </div>
      </div>
    );
  }

  const { roleCounts, classCounts, appCounts, activityData, totalUsers, totalClasses } = stats;
  const pendingApps = appCounts.pending;

  const CLASS_PIE = [
    { name: "Approved", value: classCounts.approved, color: "#10b981" },
    { name: "Pending",  value: classCounts.pending,  color: "#f59e0b" },
    { name: "Rejected", value: classCounts.rejected, color: "#ef4444" },
  ].filter((d) => d.value > 0);

  return (
    <div className="p-4 lg:p-8 space-y-8">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
          <h2 className="text-xl font-bold" style={{ color: "#ede9fe" }}>Dashboard Overview</h2>
        </div>
        {pendingApps > 0 && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(251,191,36,0.3)",
              color: "#fcd34d",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#f59e0b", boxShadow: "0 0 6px #f59e0b" }}
            />
            {pendingApps} pending teacher application{pendingApps > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* ── Top Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"   value={totalUsers}
          icon="👥" color="#a855f7"
          glow="rgba(168,85,247,0.1)"
          bg="rgba(168,85,247,0.1)"
          border="rgba(168,85,247,0.25)"
          sub={`${roleCounts.student} students · ${roleCounts.teacher} teachers`}
        />
        <StatCard
          label="Total Classes"  value={totalClasses}
          icon="📚" color="#6ee7b7"
          glow="rgba(16,185,129,0.1)"
          bg="rgba(16,185,129,0.08)"
          border="rgba(16,185,129,0.25)"
          sub={`${classCounts.approved} approved · ${classCounts.pending} pending`}
        />
        <StatCard
          label="Teacher Apps"  value={teacherApps?.length || 0}
          icon="📋" color="#fcd34d"
          glow="rgba(245,158,11,0.1)"
          bg="rgba(245,158,11,0.08)"
          border="rgba(245,158,11,0.25)"
          sub={`${appCounts.approved} approved · ${appCounts.pending} pending`}
        />
        <StatCard
          label="Admins"        value={roleCounts.admin}
          icon="🛡️" color="#c4b5fd"
          glow="rgba(124,58,237,0.1)"
          bg="rgba(124,58,237,0.08)"
          border="rgba(124,58,237,0.25)"
          sub="Platform administrators"
        />
      </div>

      {/* ── Area Chart + Class Pie ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Area chart */}
        <div
          className="lg:col-span-2 rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
            border: "1px solid rgba(139,92,246,0.15)",
            boxShadow: "0 4px 24px rgba(109,40,217,0.08)",
          }}
        >
          <SectionHeader title="Platform Growth (simulated from totals)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={activityData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="gradClasses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.1)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(167,139,250,0.6)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(167,139,250,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="Users"   stroke="#a855f7" strokeWidth={2} fill="url(#gradUsers)"   dot={false} />
              <Area type="monotone" dataKey="Classes" stroke="#10b981" strokeWidth={2} fill="url(#gradClasses)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex gap-4 mt-3 justify-center">
            {[["#a855f7","Users"],["#10b981","Classes"]].map(([color, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: color }} />
                <span className="text-xs" style={{ color: "rgba(196,181,253,0.55)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Class status pie */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
            border: "1px solid rgba(139,92,246,0.15)",
            boxShadow: "0 4px 24px rgba(109,40,217,0.08)",
          }}
        >
          <SectionHeader title="Class Status" />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CLASS_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                {CLASS_PIE.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    stroke="transparent"
                    style={{ filter: `drop-shadow(0 0 5px ${entry.color}88)` }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {CLASS_PIE.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
                  <span style={{ color: "rgba(196,181,253,0.6)" }}>{name}</span>
                </div>
                <span className="font-semibold" style={{ color }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom: Recent tables ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <SectionHeader title="Recent Users" />
          <div className="space-y-2">
            {(allUsers || []).slice(-5).reverse().map((u) => {
              const roleColor = u.role === "admin" ? "#a855f7" : u.role === "teacher" ? "#f59e0b" : "#6ee7b7";
              return (
                <div
                  key={u._id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.08)" }}
                >
                  <img
                    src={u.photoURL}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                    style={{ border: "1.5px solid rgba(139,92,246,0.4)" }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate" style={{ color: "#ddd6fe" }}>{u.name}</p>
                    <p className="text-xs truncate" style={{ color: "rgba(167,139,250,0.45)" }}>{u.email}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full capitalize shrink-0"
                    style={{
                      background: `${roleColor}18`,
                      border: `1px solid ${roleColor}44`,
                      color: roleColor,
                    }}
                  >
                    {u.role || "user"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Teacher Applications */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <SectionHeader title="Recent Teacher Applications" />
          <div className="space-y-2">
            {(teacherApps || []).slice(-5).reverse().map((a) => {
              const sc = a.status === "approved"
                ? { color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(52,211,153,0.3)" }
                : a.status === "rejected"
                ? { color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(248,113,113,0.3)" }
                : { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(251,191,36,0.3)"  };
              return (
                <div
                  key={a._id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(139,92,246,0.08)" }}
                >
                  <img
                    src={a.photoUrl}
                    alt={a.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                    style={{ border: "1.5px solid rgba(139,92,246,0.4)" }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate" style={{ color: "#ddd6fe" }}>{a.name}</p>
                    <p className="text-xs truncate" style={{ color: "rgba(167,139,250,0.45)" }}>{a.category} · {a.experience}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full capitalize shrink-0 font-medium"
                    style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                  >
                    {a.status || "pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
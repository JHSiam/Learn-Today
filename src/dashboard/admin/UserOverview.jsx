import React, { useMemo } from "react";
import useAllUsers from "../../hooks/useAllUsers";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const ROLE_CONFIG = {
  student: { color: "#a855f7", glow: "rgba(168,85,247,0.4)",  bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.3)",  label: "Students" },
  teacher: { color: "#f59e0b", glow: "rgba(245,158,11,0.4)",  bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)",  label: "Teachers" },
  admin:   { color: "#10b981", glow: "rgba(16,185,129,0.4)",  bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)",  label: "Admins"   },
  user:    { color: "#6366f1", glow: "rgba(99,102,241,0.4)",  bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)",  label: "Users"    },
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  const cfg = ROLE_CONFIG[name] || ROLE_CONFIG.user;
  return (
    <div
      className="px-4 py-2.5 rounded-xl text-sm"
      style={{
        background: "rgba(26,15,60,0.95)",
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 4px 20px ${cfg.glow}`,
        color: cfg.color,
      }}
    >
      <p className="font-semibold capitalize">{cfg.label}</p>
      <p style={{ color: "#e9d5ff" }}>{value} users</p>
    </div>
  );
};

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const cfg = ROLE_CONFIG[label] || ROLE_CONFIG.user;
  return (
    <div
      className="px-4 py-2.5 rounded-xl text-sm"
      style={{
        background: "rgba(26,15,60,0.95)",
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 4px 20px ${cfg.glow}`,
      }}
    >
      <p className="font-semibold capitalize" style={{ color: cfg.color }}>{cfg.label}</p>
      <p style={{ color: "#e9d5ff" }}>{payload[0].value} users</p>
    </div>
  );
};

export default function UserOverview() {
  const [allUsers, loading] = useAllUsers();

  const { counts, chartData, total } = useMemo(() => {
    if (!allUsers?.length) return { counts: {}, chartData: [], total: 0 };

    const counts = { student: 0, teacher: 0, admin: 0, user: 0 };
    allUsers.forEach((u) => {
      const role = u.role?.toLowerCase() || "user";
      if (counts[role] !== undefined) counts[role]++;
      else counts.user++;
    });

    const chartData = Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value }));

    return { counts, chartData, total: allUsers.length };
  }, [allUsers]);

  // ── Loading Skeleton ──
  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
          <div className="h-7 w-40 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.15)" }} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.1)" }} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-72 rounded-2xl animate-pulse" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.1)" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
        <h2 className="text-xl font-bold" style={{ color: "#ede9fe" }}>User Overview</h2>
        <span
          className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(139,92,246,0.3)", color: "#c4b5fd" }}
        >
          {total} total
        </span>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(ROLE_CONFIG).map(([role, cfg]) => {
          const count = counts[role] || 0;
          const pct = total ? Math.round((count / total) * 100) : 0;
          return (
            <div
              key={role}
              className="rounded-2xl p-5 flex flex-col gap-2"
              style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                boxShadow: `0 4px 20px ${cfg.glow.replace("0.4","0.1")}`,
              }}
            >
              {/* Icon circle */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-1"
                style={{ background: `${cfg.color}22`, border: `1px solid ${cfg.border}`, color: cfg.color }}
              >
                {role === "student" ? "🎓" : role === "teacher" ? "📋" : role === "admin" ? "🛡️" : "👤"}
              </div>
              <p className="text-2xl font-bold" style={{ color: cfg.color }}>{count}</p>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: `${cfg.color}99` }}>
                {cfg.label}
              </p>
              {/* Mini progress bar */}
              <div className="mt-1 h-1 rounded-full w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-1 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
                />
              </div>
              <p className="text-xs" style={{ color: "rgba(196,181,253,0.4)" }}>{pct}% of total</p>
            </div>
          );
        })}
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
            border: "1px solid rgba(139,92,246,0.15)",
            boxShadow: "0 4px 24px rgba(109,40,217,0.08)",
          }}
        >
          <p className="text-sm font-semibold mb-4" style={{ color: "#c4b5fd" }}>Distribution</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={ROLE_CONFIG[entry.name]?.color || "#6366f1"}
                    stroke="transparent"
                    style={{ filter: `drop-shadow(0 0 6px ${ROLE_CONFIG[entry.name]?.glow || "rgba(99,102,241,0.4)"})` }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {chartData.map(({ name, value }) => {
              const cfg = ROLE_CONFIG[name] || ROLE_CONFIG.user;
              return (
                <div key={name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 5px ${cfg.color}` }} />
                  <span className="text-xs capitalize" style={{ color: "rgba(196,181,253,0.6)" }}>
                    {cfg.label} ({value})
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bar Chart */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
            border: "1px solid rgba(139,92,246,0.15)",
            boxShadow: "0 4px 24px rgba(109,40,217,0.08)",
          }}
        >
          <p className="text-sm font-semibold mb-4" style={{ color: "#c4b5fd" }}>Breakdown by Role</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} barSize={36} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.1)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "rgba(167,139,250,0.6)", fontSize: 11, textTransform: "capitalize" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => ROLE_CONFIG[v]?.label || v}
              />
              <YAxis
                tick={{ fill: "rgba(167,139,250,0.5)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(139,92,246,0.06)" }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={ROLE_CONFIG[entry.name]?.color || "#6366f1"}
                    style={{ filter: `drop-shadow(0 0 6px ${ROLE_CONFIG[entry.name]?.glow || "rgba(99,102,241,0.4)"})` }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
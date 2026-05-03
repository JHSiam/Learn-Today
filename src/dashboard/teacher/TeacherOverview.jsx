import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaChalkboard, FaCheckCircle, FaClock } from "react-icons/fa";
import useMyClass from "../../hooks/useMyClass";

// ── constants ──────────────────────────────────────────────────────────────────
const PURPLE = "#a78bfa";
const TEAL   = "#34d399";
const AMBER  = "#fbbf24";

// ── custom tooltip ─────────────────────────────────────────────────────────────
const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-purple-700/50 rounded-xl p-3 shadow-2xl text-xs">
      {label && <p className="text-purple-300 font-semibold mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

// ── custom pie label ───────────────────────────────────────────────────────────
const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (!value) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight="bold">
      {value}
    </text>
  );
};

// ── stat card ──────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 border border-purple-700/40 hover:border-purple-500/70 rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:shadow-purple-900/40 transition-all duration-300 hover:-translate-y-1">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}20`, border: `1px solid ${color}40` }}
    >
      <span style={{ color }}>{icon}</span>
    </div>
    <div>
      <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">{label}</p>
      <p className="text-gray-100 text-3xl font-bold leading-tight">{value}</p>
    </div>
  </div>
);

// ── section wrapper ────────────────────────────────────────────────────────────
const Section = ({ title, children, className = "" }) => (
  <div className={`bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 border border-purple-700/40 rounded-2xl p-5 shadow-lg ${className}`}>
    <h3 className="text-gray-200 font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-gradient-to-b from-purple-400 to-pink-500 inline-block" />
      {title}
    </h3>
    {children}
  </div>
);

// ── main ───────────────────────────────────────────────────────────────────────
const TeacherOverview = () => {
  const [myClasses, loading] = useMyClass();

  const stats = useMemo(() => {
    if (!myClasses?.length) return { total: 0, approved: 0, pending: 0 };
    return {
      total:    myClasses.length,
      approved: myClasses.filter((c) => c.status === "approved").length,
      pending:  myClasses.filter((c) => c.status === "pending").length,
    };
  }, [myClasses]);

  // Pie chart — approved vs pending only
  const pieData = useMemo(() => [
    { name: "Approved", value: stats.approved, color: TEAL  },
    { name: "Pending",  value: stats.pending,  color: AMBER },
  ].filter((d) => d.value > 0), [stats]);

  // Bar chart — approved vs pending per… shown as two bars side by side
  const barData = useMemo(() => [
    { name: "My Classes", Approved: stats.approved, Pending: stats.pending },
  ], [stats]);

  // Horizontal bar — each class as its own row, colored by status
  const classBarData = useMemo(() =>
    (myClasses || [])
      .filter((c) => c.status === "approved" || c.status === "pending")
      .map((c) => ({
        name:     c.title?.length > 16 ? c.title.slice(0, 16) + "…" : c.title,
        Approved: c.status === "approved" ? 1 : 0,
        Pending:  c.status === "pending"  ? 1 : 0,
      })),
  [myClasses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
          <p className="text-purple-300 text-sm tracking-widest uppercase">Loading Overview…</p>
        </div>
      </div>
    );
  }

  const isEmpty = !myClasses || myClasses.length === 0;

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">A snapshot of your classes at a glance.</p>
      </div>

      {/* Stat Cards — total / approved / pending */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<FaChalkboard size={20} />}  label="Total Classes" value={stats.total}    color={PURPLE} />
        <StatCard icon={<FaCheckCircle size={20} />} label="Approved"      value={stats.approved} color={TEAL}   />
        <StatCard icon={<FaClock size={20} />}       label="Pending"       value={stats.pending}  color={AMBER}  />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Donut pie — approved vs pending share */}
        <Section title="Approved vs Pending">
          {isEmpty || pieData.length === 0 ? (
            <div className="flex items-center justify-center h-56 text-gray-600 text-sm">No class data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="46%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                  label={<PieLabel />}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                {/* Centre label — total */}
                <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" fill="#e5e7eb" fontSize={22} fontWeight="bold">
                  {stats.total}
                </text>
                <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fill="#9ca3af" fontSize={11}>
                  total
                </text>
                <Tooltip content={<DarkTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={9}
                  formatter={(v) => <span style={{ color: "#d1d5db", fontSize: 12 }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Section>

        {/* Grouped bar — approved vs pending count */}
        <Section title="Class Status Breakdown">
          {isEmpty ? (
            <div className="flex items-center justify-center h-56 text-gray-600 text-sm">No class data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={classBarData.length ? classBarData : barData}
                margin={{ top: 10, right: 10, left: -10, bottom: classBarData.length ? 30 : 10 }}
                layout={classBarData.length > 3 ? "vertical" : "horizontal"}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                {classBarData.length > 3 ? (
                  <>
                    <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
                  </>
                ) : (
                  <>
                    <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} angle={classBarData.length ? -20 : 0} textAnchor={classBarData.length ? "end" : "middle"} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  </>
                )}
                <Tooltip content={<DarkTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={9}
                  formatter={(v) => <span style={{ color: "#d1d5db", fontSize: 12 }}>{v}</span>}
                />
                <Bar dataKey="Approved" fill={TEAL}  radius={[6, 6, 0, 0]} maxBarSize={44} />
                <Bar dataKey="Pending"  fill={AMBER} radius={[6, 6, 0, 0]} maxBarSize={44} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Section>
      </div>

      {/* Recent classes table — approved & pending only */}
      <Section title="Approved & Pending Classes">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-800/40">
                {["Title", "Price", "Students", "Status"].map((h) => (
                  <th key={h} className="text-left text-gray-500 text-xs uppercase tracking-widest pb-3 pr-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(myClasses || [])
                .filter((c) => c.status === "approved" || c.status === "pending")
                .slice(0, 6)
                .map((c, i) => (
                  <tr key={c._id || i} className="border-b border-purple-900/30 hover:bg-purple-900/10 transition-colors">
                    <td className="py-3 pr-4 text-gray-200 font-medium truncate max-w-[160px]">{c.title}</td>
                    <td className="py-3 pr-4 text-pink-400 font-semibold">${c.price}</td>
                    <td className="py-3 pr-4 text-gray-300">{c.totalEnrollment || 0}</td>
                    <td className="py-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: c.status === "approved" ? `${TEAL}20`  : `${AMBER}20`,
                          color:      c.status === "approved" ? TEAL          : AMBER,
                          border:     `1px solid ${c.status === "approved" ? TEAL : AMBER}40`,
                        }}
                      >
                        {c.status === "approved" ? "Approved" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              {isEmpty && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-600">No classes yet. Add your first class!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

export default TeacherOverview;
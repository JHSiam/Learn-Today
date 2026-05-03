// MyClass.jsx
import React from "react";
import useMyClass from "../../hooks/useMyClass";
import ClassCard from "./ClassCard";

export default function MyClass() {
  const [myClasses, loading, refetch] = useMyClass();

  // ── Skeleton ──
  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
          <div className="h-7 w-40 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.15)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(139,92,246,0.12)" }}
            >
              <div className="h-44" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="p-5 space-y-3">
                <div className="h-4 w-3/4 rounded-lg" style={{ background: "rgba(139,92,246,0.15)" }} />
                <div className="h-3 w-1/2 rounded-lg" style={{ background: "rgba(139,92,246,0.1)" }} />
                <div className="h-3 w-2/3 rounded-lg" style={{ background: "rgba(139,92,246,0.1)" }} />
                <div className="h-3 w-1/3 rounded-lg" style={{ background: "rgba(139,92,246,0.1)" }} />
                <div className="flex gap-2 pt-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-8 flex-1 rounded-xl" style={{ background: "rgba(139,92,246,0.1)" }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Empty State ──
  if (myClasses.length === 0) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
          <h1 className="text-xl font-bold" style={{ color: "#ede9fe" }}>My Classes</h1>
        </div>
        <div
          className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.07),rgba(109,40,217,0.03))",
            border: "1px solid rgba(139,92,246,0.12)",
          }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-5"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow: "0 0 30px rgba(124,58,237,0.15)",
            }}
          >
            🎓
          </div>
          <p className="text-lg font-semibold mb-2" style={{ color: "#c4b5fd" }}>No Classes Yet</p>
          <p className="text-sm" style={{ color: "rgba(167,139,250,0.45)" }}>
            You haven't created any classes yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
        <h1 className="text-xl font-bold" style={{ color: "#ede9fe" }}>My Classes</h1>
        <span
          className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#c4b5fd",
          }}
        >
          {myClasses.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClasses.map((classItem) => (
          <ClassCard key={classItem._id} classItem={classItem} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
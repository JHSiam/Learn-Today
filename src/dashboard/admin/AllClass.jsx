import React from "react";
import useAllClass from "../../hooks/useAllClass";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AllClass() {
  const [allClasses, loading, refetch] = useAllClass();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleApprove = async (id) => {
    try {
      const response = await axiosPublic.put(`/classes/${id}`, { status: "approved" });
      if (response.data.modifiedCount > 0) {
        Swal.fire({ icon: "success", title: "Class Approved!", text: "The class has been successfully approved.", timer: 2000, showConfirmButton: false });
        refetch();
      } else {
        Swal.fire({ icon: "error", title: "Failed to Approve", text: "An error occurred. Please try again." });
      }
    } catch (error) {
      console.error("Error approving class:", error);
      Swal.fire({ icon: "error", title: "Error", text: "An error occurred while approving the class." });
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axiosPublic.put(`/classes/${id}`, { status: "rejected" });
      if (response.data.modifiedCount > 0) {
        Swal.fire({ icon: "success", title: "Class Rejected!", text: "The class has been successfully rejected.", timer: 2000, showConfirmButton: false });
        refetch();
      } else {
        Swal.fire({ icon: "error", title: "Failed to Reject", text: "An error occurred. Please try again." });
      }
    } catch (error) {
      console.error("Error rejecting class:", error);
      Swal.fire({ icon: "error", title: "Error", text: "An error occurred while rejecting the class." });
    }
  };

  const statusStyle = (status) => {
    if (status === "approved") return { bg: "rgba(16,185,129,0.15)",  border: "rgba(52,211,153,0.35)",  text: "#6ee7b7" };
    if (status === "rejected") return { bg: "rgba(239,68,68,0.15)",   border: "rgba(248,113,113,0.35)", text: "#fca5a5" };
    return                            { bg: "rgba(245,158,11,0.15)",  border: "rgba(251,191,36,0.35)",  text: "#fcd34d" };
  };

  // ── Loading Skeleton ──
  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
          <div className="h-7 w-36 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.15)" }} />
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(139,92,246,0.12)" }}>
          <div className="grid grid-cols-5 gap-4 px-5 py-3" style={{ background: "rgba(124,58,237,0.12)" }}>
            {["w-24","w-16","w-32","w-40","w-28"].map((w, i) => (
              <div key={i} className={`h-3 ${w} rounded animate-pulse`} style={{ background: "rgba(139,92,246,0.2)" }} />
            ))}
          </div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-4 items-center px-5 py-4"
              style={{
                background: i % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent",
                borderTop: "1px solid rgba(139,92,246,0.07)",
              }}
            >
              <div className="h-3 w-24 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="w-14 h-14 rounded-xl animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-3 w-32 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="space-y-1.5">
                <div className="h-2.5 w-full rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
                <div className="h-2.5 w-3/4 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              </div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-7 w-16 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* ── Page Header ── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
        <h2 className="text-xl font-bold" style={{ color: "#ede9fe" }}>All Classes</h2>
        <span
          className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#c4b5fd",
          }}
        >
          {allClasses.length}
        </span>
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div
        className="hidden md:block rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(139,92,246,0.15)",
          boxShadow: "0 4px 24px rgba(109,40,217,0.1)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(124,58,237,0.18)" }}>
                {["Title", "Image", "Email", "Description", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
                    style={{ color: "rgba(167,139,250,0.7)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allClasses.map((classItem, index) => {
                const s = statusStyle(classItem.status);
                const isApproved = classItem.status === "approved";
                const isRejected = classItem.status === "rejected";

                return (
                  <tr
                    key={classItem._id}
                    style={{
                      background: index % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent",
                      borderTop: "1px solid rgba(139,92,246,0.08)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent"}
                  >
                    {/* Title + status badge */}
                    <td className="px-4 py-3 max-w-[160px]">
                      <p className="font-semibold truncate" style={{ color: "#ddd6fe" }}>{classItem.title}</p>
                      <span
                        className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                        style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
                      >
                        {classItem.status || "pending"}
                      </span>
                    </td>

                    {/* Image */}
                    <td className="px-4 py-3">
                      <img
                        src={classItem.image}
                        alt={classItem.title}
                        className="w-14 h-14 rounded-xl object-cover"
                        style={{
                          border: "2px solid rgba(139,92,246,0.3)",
                          boxShadow: "0 0 10px rgba(168,85,247,0.15)",
                        }}
                      />
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(196,181,253,0.6)" }}>
                      {classItem.email}
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3 max-w-[200px]">
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "rgba(196,181,253,0.5)" }}>
                        {classItem.description.slice(0, 80)}…
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Approve */}
                        <button
                          onClick={() => handleApprove(classItem._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                          style={{
                            background: "rgba(16,185,129,0.15)",
                            border: "1px solid rgba(52,211,153,0.35)",
                            color: "#6ee7b7",
                            cursor: "pointer",
                          }}
                        >
                          ✓ Approve
                        </button>

                        {/* Reject */}
                        <button
                          onClick={() => handleReject(classItem._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                          style={{
                            background: "rgba(239,68,68,0.15)",
                            border: "1px solid rgba(248,113,113,0.35)",
                            color: "#fca5a5",
                            cursor: "pointer",
                          }}
                        >
                          ✕ Reject
                        </button>

                        {/* Progress */}
                        <button
                          disabled={!isApproved}
                          onClick={() => navigate(`admin-class-progress/${classItem._id}`)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                          style={{
                            background: isApproved ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.05)",
                            border: `1px solid ${isApproved ? "rgba(139,92,246,0.45)" : "rgba(139,92,246,0.1)"}`,
                            color: isApproved ? "#c4b5fd" : "rgba(196,181,253,0.25)",
                            cursor: isApproved ? "pointer" : "not-allowed",
                          }}
                        >
                          ↗ Progress
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MOBILE CARDS ── */}
      <div className="md:hidden space-y-3">
        {allClasses.map((classItem) => {
          const s = statusStyle(classItem.status);
          const isApproved = classItem.status === "approved";

          return (
            <div
              key={classItem._id}
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
                border: "1px solid rgba(139,92,246,0.15)",
                boxShadow: "0 2px 12px rgba(109,40,217,0.08)",
              }}
            >
              {/* Top row: image + title + status */}
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                  style={{
                    border: "2px solid rgba(139,92,246,0.35)",
                    boxShadow: "0 0 10px rgba(168,85,247,0.15)",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate" style={{ color: "#ddd6fe" }}>
                    {classItem.title}
                  </p>
                  <p className="text-xs truncate mt-0.5" style={{ color: "rgba(167,139,250,0.5)" }}>
                    {classItem.email}
                  </p>
                  <span
                    className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                    style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
                  >
                    {classItem.status || "pending"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed mb-4 px-1"
                style={{ color: "rgba(196,181,253,0.45)" }}
              >
                {classItem.description.slice(0, 100)}…
              </p>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleApprove(classItem._id)}
                  className="text-xs font-semibold py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(52,211,153,0.35)",
                    color: "#6ee7b7",
                    cursor: "pointer",
                  }}
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleReject(classItem._id)}
                  className="text-xs font-semibold py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: "rgba(239,68,68,0.15)",
                    border: "1px solid rgba(248,113,113,0.35)",
                    color: "#fca5a5",
                    cursor: "pointer",
                  }}
                >
                  ✕ Reject
                </button>
                <button
                  disabled={!isApproved}
                  onClick={() => navigate(`admin-class-progress/${classItem._id}`)}
                  className="text-xs font-semibold py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: isApproved ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.05)",
                    border: `1px solid ${isApproved ? "rgba(139,92,246,0.45)" : "rgba(139,92,246,0.1)"}`,
                    color: isApproved ? "#c4b5fd" : "rgba(196,181,253,0.25)",
                    cursor: isApproved ? "pointer" : "not-allowed",
                  }}
                >
                  ↗ Progress
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
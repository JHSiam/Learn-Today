import React from "react";
import useTeacherApplication from "../../hooks/useTeacherApplication";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function TeacherApplications() {
  const [teacherApplications, loading, refetch] = useTeacherApplication();
  const axiosPublic = useAxiosPublic();

  const handleStatusUpdate = (email, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this application?`,
      text: "This action will update the application status.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/teacher-application/${email}`, { status })
          .then((response) => {
            if (response.data.modifiedCount > 0 && status === "approved") {
              axiosPublic
                .put(`/users-to-teacher/${email}`, { role: "teacher" })
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", "Application approved, and user role updated to teacher.", "success");
                  } else if (res.status === 400) {
                    Swal.fire("Note!", "User is an admin. Role was not changed.", "info");
                  }
                  refetch();
                })
                .catch((err) => {
                  console.error("Error updating user role:", err);
                  Swal.fire("Note!", "User is an admin. Role was not changed.", "info");
                  refetch();
                });
            } else if (status === "rejected") {
              Swal.fire("Rejected", "Application has been rejected.", "info");
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error updating application status:", error);
            Swal.fire("Error!", "An error occurred. Please try again later.", "error");
          });
      }
    });
  };

  const statusStyle = (status) => {
    if (status === "approved") return { bg: "rgba(16,185,129,0.15)", border: "rgba(52,211,153,0.35)", text: "#6ee7b7" };
    if (status === "rejected") return { bg: "rgba(239,68,68,0.15)", border: "rgba(248,113,113,0.35)", text: "#fca5a5" };
    return { bg: "rgba(245,158,11,0.15)", border: "rgba(251,191,36,0.35)", text: "#fcd34d" };
  };

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
          <div className="h-7 w-52 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.15)" }} />
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(139,92,246,0.12)" }}>
          {/* Skeleton header */}
          <div className="grid grid-cols-8 gap-4 px-5 py-3" style={{ background: "rgba(124,58,237,0.12)" }}>
            {["w-4","w-20","w-10","w-20","w-24","w-20","w-14","w-20"].map((w, i) => (
              <div key={i} className={`h-3 ${w} rounded animate-pulse`} style={{ background: "rgba(139,92,246,0.2)" }} />
            ))}
          </div>
          {/* Skeleton rows */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-8 gap-4 items-center px-5 py-4"
              style={{
                background: i % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent",
                borderTop: "1px solid rgba(139,92,246,0.07)",
              }}
            >
              <div className="h-3 w-4 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-3 w-20 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="w-9 h-9 rounded-full animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-3 w-16 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-3 w-20 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-3 w-16 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-5 w-16 rounded-full animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="flex gap-2">
                <div className="h-7 w-16 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
                <div className="h-7 w-14 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
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
        <h2 className="text-xl font-bold" style={{ color: "#ede9fe" }}>
          Teacher Applications
        </h2>
        <span
          className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#c4b5fd",
          }}
        >
          {teacherApplications.length}
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
                {["#", "Name", "Photo", "Experience", "Title", "Category", "Status", "Actions"].map((h) => (
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
              {teacherApplications.map((application, index) => {
                const s = statusStyle(application.status);
                const isRejected = application.status === "rejected";
                return (
                  <tr
                    key={application._id}
                    style={{
                      background: index % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent",
                      borderTop: "1px solid rgba(139,92,246,0.08)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent"}
                  >
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "rgba(167,139,250,0.45)" }}>
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: "#ddd6fe" }}>
                      {application.name}
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={application.photoUrl}
                        alt={application.name}
                        className="w-9 h-9 rounded-full object-cover"
                        style={{
                          border: "2px solid rgba(139,92,246,0.4)",
                          boxShadow: "0 0 8px rgba(168,85,247,0.2)",
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 capitalize" style={{ color: "rgba(196,181,253,0.65)" }}>
                      {application.experience}
                    </td>
                    <td className="px-4 py-3" style={{ color: "rgba(196,181,253,0.65)" }}>
                      {application.title}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
                        style={{
                          background: "rgba(124,58,237,0.15)",
                          border: "1px solid rgba(139,92,246,0.25)",
                          color: "#c4b5fd",
                        }}
                      >
                        {application.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize whitespace-nowrap"
                        style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatusUpdate(application.email, "approved")}
                          disabled={isRejected}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                          style={{
                            background: isRejected ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.15)",
                            border: `1px solid ${isRejected ? "rgba(52,211,153,0.1)" : "rgba(52,211,153,0.35)"}`,
                            color: isRejected ? "rgba(110,231,183,0.3)" : "#6ee7b7",
                            cursor: isRejected ? "not-allowed" : "pointer",
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(application.email, "rejected")}
                          disabled={isRejected}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                          style={{
                            background: isRejected ? "rgba(239,68,68,0.05)" : "rgba(239,68,68,0.15)",
                            border: `1px solid ${isRejected ? "rgba(248,113,113,0.1)" : "rgba(248,113,113,0.35)"}`,
                            color: isRejected ? "rgba(252,165,165,0.3)" : "#fca5a5",
                            cursor: isRejected ? "not-allowed" : "pointer",
                          }}
                        >
                          Reject
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
        {teacherApplications.map((application, index) => {
          const s = statusStyle(application.status);
          const isRejected = application.status === "rejected";
          return (
            <div
              key={application._id}
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
                border: "1px solid rgba(139,92,246,0.15)",
                boxShadow: "0 2px 12px rgba(109,40,217,0.08)",
              }}
            >
              {/* Card top row */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={application.photoUrl}
                  alt={application.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                  style={{
                    border: "2px solid rgba(139,92,246,0.4)",
                    boxShadow: "0 0 10px rgba(168,85,247,0.2)",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate" style={{ color: "#ddd6fe" }}>
                    {application.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: "rgba(167,139,250,0.5)" }}>
                    {application.title}
                  </p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize shrink-0"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
                >
                  {application.status}
                </span>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { label: "Experience", value: application.experience },
                  { label: "Category", value: application.category },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(139,92,246,0.12)" }}
                  >
                    <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(167,139,250,0.4)" }}>{label}</span>
                    <span className="text-xs font-medium capitalize" style={{ color: "#c4b5fd" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(application.email, "approved")}
                  disabled={isRejected}
                  className="flex-1 text-xs font-semibold py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: isRejected ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.15)",
                    border: `1px solid ${isRejected ? "rgba(52,211,153,0.1)" : "rgba(52,211,153,0.35)"}`,
                    color: isRejected ? "rgba(110,231,183,0.3)" : "#6ee7b7",
                    cursor: isRejected ? "not-allowed" : "pointer",
                  }}
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(application.email, "rejected")}
                  disabled={isRejected}
                  className="flex-1 text-xs font-semibold py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: isRejected ? "rgba(239,68,68,0.05)" : "rgba(239,68,68,0.15)",
                    border: `1px solid ${isRejected ? "rgba(248,113,113,0.1)" : "rgba(52,211,153,0.1)"}`,
                    color: isRejected ? "rgba(252,165,165,0.3)" : "#fca5a5",
                    cursor: isRejected ? "not-allowed" : "pointer",
                  }}
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
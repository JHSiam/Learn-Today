import React from "react";
import useAllUsers from "../../hooks/useAllUsers";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function AllUsers() {
  const [allUsers, loading, refetch] = useAllUsers();
  const axiosPublic = useAxiosPublic();

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to make this user an admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`users/${userId}`, { role: "admin" })
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              Swal.fire("Updated!", "The user has been made an admin.", "success");
              refetch();
            } else {
              Swal.fire("Oops!", "Failed to update the user.", "error");
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const roleStyle = (role) => {
    if (role === "admin")   return { bg: "rgba(124,58,237,0.2)",  border: "rgba(139,92,246,0.45)", text: "#c4b5fd" };
    if (role === "teacher") return { bg: "rgba(245,158,11,0.15)", border: "rgba(251,191,36,0.35)", text: "#fcd34d" };
    return                         { bg: "rgba(99,102,241,0.12)", border: "rgba(129,140,248,0.3)", text: "#a5b4fc" };
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
          <div className="grid grid-cols-6 gap-4 px-5 py-3" style={{ background: "rgba(124,58,237,0.12)" }}>
            {["w-4","w-10","w-24","w-36","w-14","w-20"].map((w, i) => (
              <div key={i} className={`h-3 ${w} rounded animate-pulse`} style={{ background: "rgba(139,92,246,0.2)" }} />
            ))}
          </div>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-6 gap-4 items-center px-5 py-4"
              style={{
                background: i % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent",
                borderTop: "1px solid rgba(139,92,246,0.07)",
              }}
            >
              <div className="h-3 w-4 rounded animate-pulse"  style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="w-9 h-9 rounded-full animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-3 w-24 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-3 w-36 rounded animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-5 w-14 rounded-full animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="h-7 w-24 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.12)" }} />
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
        <h2 className="text-xl font-bold" style={{ color: "#ede9fe" }}>All Users</h2>
        <span
          className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#c4b5fd",
          }}
        >
          {allUsers?.length}
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
                {["#", "Photo", "Name", "Email", "Role", "Actions"].map((h) => (
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
              {allUsers?.map((user, index) => {
                const s = roleStyle(user.role);
                const isAdmin = user.role === "admin";
                return (
                  <tr
                    key={user._id}
                    style={{
                      background: index % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent",
                      borderTop: "1px solid rgba(139,92,246,0.08)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "rgba(124,58,237,0.04)" : "transparent"}
                  >
                    {/* Index */}
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "rgba(167,139,250,0.45)" }}>
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    {/* Avatar */}
                    <td className="px-4 py-3">
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover"
                        style={{
                          border: "2px solid rgba(139,92,246,0.4)",
                          boxShadow: "0 0 8px rgba(168,85,247,0.2)",
                        }}
                      />
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: "#ddd6fe" }}>
                      {user.name}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(196,181,253,0.6)" }}>
                      {user.email}
                    </td>

                    {/* Role badge */}
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize whitespace-nowrap"
                        style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        disabled={isAdmin}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                        style={{
                          background: isAdmin ? "rgba(124,58,237,0.05)" : "rgba(124,58,237,0.2)",
                          border: `1px solid ${isAdmin ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.45)"}`,
                          color: isAdmin ? "rgba(196,181,253,0.25)" : "#c4b5fd",
                          cursor: isAdmin ? "not-allowed" : "pointer",
                        }}
                      >
                        Make Admin
                      </button>
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
        {allUsers?.map((user, index) => {
          const s = roleStyle(user.role);
          const isAdmin = user.role === "admin";
          return (
            <div
              key={user._id}
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
                border: "1px solid rgba(139,92,246,0.15)",
                boxShadow: "0 2px 12px rgba(109,40,217,0.08)",
              }}
            >
              {/* Top row */}
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                  style={{
                    border: "2px solid rgba(139,92,246,0.4)",
                    boxShadow: "0 0 10px rgba(168,85,247,0.2)",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate" style={{ color: "#ddd6fe" }}>
                    {user.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: "rgba(167,139,250,0.5)" }}>
                    {user.email}
                  </p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize shrink-0"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
                >
                  {user.role || "user"}
                </span>
              </div>

              {/* Action */}
              <button
                onClick={() => handleMakeAdmin(user._id)}
                disabled={isAdmin}
                className="mt-3 w-full text-xs font-semibold py-2 rounded-xl transition-all duration-200"
                style={{
                  background: isAdmin ? "rgba(124,58,237,0.05)" : "rgba(124,58,237,0.18)",
                  border: `1px solid ${isAdmin ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.4)"}`,
                  color: isAdmin ? "rgba(196,181,253,0.25)" : "#c4b5fd",
                  cursor: isAdmin ? "not-allowed" : "pointer",
                }}
              >
                {isAdmin ? "Already Admin" : "⬆ Make Admin"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
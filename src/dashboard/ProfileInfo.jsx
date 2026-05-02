import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

export default function ProfileInfo() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosPublic.get(`/users/${user.email}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    if (user?.email) fetchProfileData();
  }, [user?.email, axiosPublic]);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "rgba(168,85,247,0.4)", borderTopColor: "#a855f7" }}
          />
          <p className="text-sm" style={{ color: "rgba(196,181,253,0.5)" }}>
            Loading profile…
          </p>
        </div>
      </div>
    );
  }

  const roleBadgeColor = {
    admin:   { bg: "rgba(124,58,237,0.25)",  border: "rgba(139,92,246,0.5)",  text: "#c4b5fd" },
    teacher: { bg: "rgba(59,130,246,0.2)",   border: "rgba(96,165,250,0.4)",  text: "#93c5fd" },
    student: { bg: "rgba(16,185,129,0.2)",   border: "rgba(52,211,153,0.4)",  text: "#6ee7b7" },
  };
  const badge = roleBadgeColor[profileData.role?.toLowerCase()] || roleBadgeColor.student;

  return (
    <div className="flex items-start justify-center min-h-[60vh] p-4">
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg,#1a0f3c 0%,#120b2e 100%)",
          border: "1px solid rgba(139,92,246,0.18)",
          boxShadow: "0 8px 40px rgba(109,40,217,0.25), 0 0 0 1px rgba(139,92,246,0.08)",
        }}
      >
        {/* ── Banner ── */}
        <div
          className="relative h-24"
          style={{
            background:
              "linear-gradient(135deg,#3b0764 0%,#6d28d9 50%,#4c1d95 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#a855f7,transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-8 w-16 h-16 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle,#e879f9,transparent 70%)" }}
          />
        </div>

        {/* ── Avatar ── */}
        <div className="flex justify-center -mt-12 px-6">
          <div className="relative">
            <img
              src={profileData.photoURL}
              alt={`${profileData.name}'s profile`}
              className="w-24 h-24 rounded-full object-cover"
              style={{
                border: "3px solid #1a0f3c",
                boxShadow: "0 0 0 2px rgba(139,92,246,0.5), 0 0 20px rgba(168,85,247,0.3)",
              }}
            />
            {/* Online dot */}
            <span
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full"
              style={{
                background: "#10b981",
                border: "2px solid #1a0f3c",
                boxShadow: "0 0 8px rgba(16,185,129,0.6)",
              }}
            />
          </div>
        </div>

        {/* ── Name + Role ── */}
        <div className="flex flex-col items-center gap-2 mt-3 px-6">
          <h2
            className="text-xl font-bold tracking-wide"
            style={{ color: "#ede9fe" }}
          >
            {profileData.name}
          </h2>
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: badge.bg,
              border: `1px solid ${badge.border}`,
              color: badge.text,
            }}
          >
            {profileData.role}
          </span>
        </div>

        {/* ── Divider ── */}
        <div
          className="mx-6 my-5"
          style={{ height: "1px", background: "rgba(139,92,246,0.12)" }}
        />

        {/* ── Info Fields ── */}
        <div className="px-6 pb-6 space-y-3">
          {[
            {
              label: "Email",
              value: profileData.email,
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              ),
            },
            {
              label: "Phone",
              value: profileData.phone || "Not provided",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L9.09 11a16 16 0 006.91 6.91l1.27-1.27a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 16.92z" />
                </svg>
              ),
            },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(124,58,237,0.07)",
                border: "1px solid rgba(139,92,246,0.1)",
              }}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  color: "#a78bfa",
                }}
              >
                {icon}
              </span>
              <div className="min-w-0">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                  style={{ color: "rgba(167,139,250,0.45)" }}
                >
                  {label}
                </p>
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: value === "Not provided" ? "rgba(196,181,253,0.3)" : "#ddd6fe" }}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
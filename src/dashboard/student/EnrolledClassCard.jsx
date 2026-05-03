// EnrolledClassCard.jsx
import React from "react";
import { FaArrowRight, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EnrolledClassCard = ({ title, name, image, classId }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: "linear-gradient(160deg,#1a0f3c 0%,#120b2e 100%)",
        border: "1px solid rgba(139,92,246,0.18)",
        boxShadow: "0 4px 20px rgba(109,40,217,0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(109,40,217,0.28)";
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(109,40,217,0.1)";
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.18)";
      }}
    >
      {/* ── Image ── */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(18,11,46,0.85) 0%, transparent 60%)",
          }}
        />
        {/* Enrolled badge */}
        <div
          className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(16,185,129,0.2)",
            border: "1px solid rgba(52,211,153,0.4)",
            color: "#6ee7b7",
            backdropFilter: "blur(6px)",
          }}
        >
          ✓ Enrolled
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <h2
          className="font-bold text-base leading-snug line-clamp-2"
          style={{ color: "#ede9fe" }}
        >
          {title}
        </h2>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#a78bfa",
            }}
          >
            <FaUserTie size={11} />
          </span>
          <p className="text-xs truncate" style={{ color: "rgba(196,181,253,0.6)" }}>
            <span style={{ color: "rgba(167,139,250,0.45)" }}>Instructor: </span>
            <span style={{ color: "#c4b5fd" }}>{name}</span>
          </p>
        </div>

        {/* Divider */}
        <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}>
          <button
            onClick={() => navigate(`my-enroll-class-details/${classId}`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(168,85,247,0.15))",
              border: "1px solid rgba(139,92,246,0.35)",
              color: "#c4b5fd",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg,rgba(124,58,237,0.4),rgba(168,85,247,0.3))";
              e.currentTarget.style.color = "#e9d5ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(168,85,247,0.15))";
              e.currentTarget.style.color = "#c4b5fd";
            }}
          >
            Continue Learning
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrolledClassCard;
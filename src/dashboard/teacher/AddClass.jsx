import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function AddClass() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const classData = {
      ...data,
      email: user?.email,
      name: user?.displayName,
      enrollment: 0,
      status: "pending",
    };

    axiosPublic
      .post("/classes", classData)
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire("Class Added!", "Your class has been submitted for review.", "success");
          reset();
        }
      })
      .catch((error) => {
        console.error("Error adding class:", error);
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      });
  };

  const fieldStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    background: "rgba(124,58,237,0.07)",
    border: "1px solid rgba(139,92,246,0.2)",
    color: "#e9d5ff",
  };

  const readOnlyStyle = {
    ...fieldStyle,
    background: "rgba(124,58,237,0.04)",
    border: "1px solid rgba(139,92,246,0.1)",
    color: "rgba(196,181,253,0.45)",
    cursor: "not-allowed",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "6px",
    color: "rgba(167,139,250,0.65)",
  };

  const errorStyle = {
    fontSize: "11px",
    marginTop: "5px",
    color: "#fca5a5",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "rgba(139,92,246,0.5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(139,92,246,0.2)";
    e.target.style.boxShadow = "none";
  };

  const fields = [
    {
      id: "title", label: "Class Title", type: "input", inputType: "text",
      placeholder: "e.g. Advanced Web Development",
      icon: "📘",
      rules: { required: "Title is required" },
    },
    {
      id: "price", label: "Price (USD)", type: "input", inputType: "number",
      placeholder: "e.g. 49",
      icon: "💵",
      rules: { required: "Price is required", min: { value: 1, message: "Price must be at least $1" } },
    },
    {
      id: "image", label: "Image URL", type: "input", inputType: "url",
      placeholder: "https://example.com/image.jpg",
      icon: "🖼️",
      rules: { required: "Image URL is required" },
    },
    {
      id: "description", label: "Description", type: "textarea",
      placeholder: "Describe what students will learn in this class…",
      icon: "📝",
      rules: {
        required: "Description is required",
        minLength: { value: 10, message: "Description must be at least 10 characters" },
      },
    },
  ];

  return (
    <div className="p-4 lg:p-8">
      {/* ── Page Header ── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
        <h2 className="text-xl font-bold" style={{ color: "#ede9fe" }}>Add New Class</h2>
      </div>

      <div className="max-w-2xl">
        <div
          className="rounded-2xl p-6 lg:p-8"
          style={{
            background: "linear-gradient(160deg,rgba(26,15,60,0.9) 0%,rgba(18,11,46,0.95) 100%)",
            border: "1px solid rgba(139,92,246,0.18)",
            boxShadow: "0 8px 40px rgba(109,40,217,0.15)",
          }}
        >
          {/* Instructor info banner */}
          <div
            className="flex items-center gap-3 p-4 rounded-xl mb-8"
            style={{
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-base"
              style={{
                background: "linear-gradient(135deg,#6d28d9,#9333ea)",
                boxShadow: "0 0 12px rgba(168,85,247,0.4)",
              }}
            >
              {user?.photoURL
                ? <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                : "👤"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate" style={{ color: "#c4b5fd" }}>
                {user?.displayName || "Instructor"}
              </p>
              <p className="text-xs truncate" style={{ color: "rgba(167,139,250,0.5)" }}>
                {user?.email}
              </p>
            </div>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
              style={{
                background: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(251,191,36,0.3)",
                color: "#fcd34d",
              }}
            >
              Teacher
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* ── Read-only fields row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  style={readOnlyStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Your Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  style={readOnlyStyle}
                />
              </div>
            </div>

            {/* ── Dynamic fields ── */}
            {fields.map(({ id, label, type, inputType, placeholder, icon, rules }) => (
              <div key={id}>
                <label style={labelStyle}>
                  <span className="mr-1">{icon}</span> {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    {...register(id, rules)}
                    placeholder={placeholder}
                    rows={4}
                    style={{ ...fieldStyle, resize: "vertical", lineHeight: "1.6" }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                ) : (
                  <input
                    type={inputType}
                    {...register(id, rules)}
                    placeholder={placeholder}
                    style={fieldStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                )}
                {errors[id] && (
                  <p style={errorStyle}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5.5" stroke="#fca5a5" />
                      <path d="M6 4v3M6 8.5v.5" stroke="#fca5a5" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {errors[id].message}
                  </p>
                )}
              </div>
            ))}

            {/* ── Pending notice ── */}
            <div
              className="flex items-start gap-2.5 p-3 rounded-xl text-xs"
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(251,191,36,0.2)",
                color: "rgba(252,211,77,0.7)",
              }}
            >
              <span className="mt-0.5 shrink-0">⏳</span>
              <p>Your class will be submitted for admin review. It will go live once approved.</p>
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
              style={{
                background: isSubmitting
                  ? "rgba(124,58,237,0.3)"
                  : "linear-gradient(135deg,#7c3aed,#a855f7)",
                border: "1px solid rgba(139,92,246,0.4)",
                color: isSubmitting ? "rgba(196,181,253,0.4)" : "#fff",
                boxShadow: isSubmitting ? "none" : "0 0 20px rgba(168,85,247,0.35)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.boxShadow = "0 0 30px rgba(168,85,247,0.55)";
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.boxShadow = "0 0 20px rgba(168,85,247,0.35)";
              }}
            >
              {isSubmitting ? "Submitting…" : "✦ Submit Class for Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
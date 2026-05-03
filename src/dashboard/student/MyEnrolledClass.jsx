// MyEnrolledClass.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import EnrolledClassCard from "./EnrolledClassCard";

const MyEnrolledClass = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/my-enrolled-class/${user.email}`)
        .then((response) => {
          setClasses(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching enrolled classes:", error);
          setLoading(false);
        });
    }
  }, [user?.email, axiosPublic]);

  // ── Skeleton ──
  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
          <div className="h-7 w-52 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.15)" }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{
                background: "rgba(124,58,237,0.07)",
                border: "1px solid rgba(139,92,246,0.12)",
              }}
            >
              <div className="h-44 w-full" style={{ background: "rgba(139,92,246,0.12)" }} />
              <div className="p-5 space-y-3">
                <div className="h-4 w-3/4 rounded-lg" style={{ background: "rgba(139,92,246,0.15)" }} />
                <div className="h-3 w-1/2 rounded-lg" style={{ background: "rgba(139,92,246,0.1)" }} />
                <div className="h-8 w-28 rounded-xl mt-4" style={{ background: "rgba(139,92,246,0.12)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Empty State ──
  if (classes.length === 0) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg,#7c3aed,#a855f7)" }} />
          <h1 className="text-xl font-bold" style={{ color: "#ede9fe" }}>My Enrolled Classes</h1>
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
            📚
          </div>
          <p className="text-lg font-semibold mb-2" style={{ color: "#c4b5fd" }}>No Classes Yet</p>
          <p className="text-sm" style={{ color: "rgba(167,139,250,0.45)" }}>
            You have not enrolled in any classes yet.
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
        <h1 className="text-xl font-bold" style={{ color: "#ede9fe" }}>My Enrolled Classes</h1>
        <span
          className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#c4b5fd",
          }}
        >
          {classes.length}
        </span>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classData) => (
          <EnrolledClassCard
            key={classData._id}
            title={classData.title}
            name={classData.instructor}
            image={classData.image}
            classId={classData.classId}
          />
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledClass;
import React from "react";
import useTeacherApplication from "../../hooks/useTeacherApplication";

export default function TeacherApplications() {
  const [teacherApplications] = useTeacherApplication();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Teacher Applications</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {teacherApplications.map((application, index) => (
              <tr key={application._id}>
                <td>{index + 1}</td>
                <td>{application.name}</td>
                <td>
                  <img
                    src={application.photoUrl}
                    alt={application.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{application.experience}</td>
                <td>{application.title}</td>
                <td>{application.category}</td>
                <td>
                  <span
                    className={`badge ${
                      application.status === "approved"
                        ? "badge-success"
                        : application.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-success mr-2">
                    Approve
                  </button>
                  <button className="btn btn-sm btn-error">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

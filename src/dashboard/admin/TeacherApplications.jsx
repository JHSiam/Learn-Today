import React from "react";
import useTeacherApplication from "../../hooks/useTeacherApplication";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function TeacherApplications() {
  const [teacherApplications, , refetch] = useTeacherApplication();
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
        // Update application status
        axiosPublic
          .put(`/teacher-application/${email}`, { status })
          .then((response) => {

            if (response.data.modifiedCount > 0 && status === "approved") {
              // Change the user's role to teacher if approved
              axiosPublic
                .put(`/users-to-teacher/${email}`, { role: "teacher" })
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    Swal.fire(
                      "Success!",
                      "Application approved, and user role updated to teacher.",
                      "success"
                    );
                  } else if (res.status === 400) {
                    Swal.fire(
                      "Note!",
                      "User is an admin. Role was not changed.",
                      "info"
                    );
                  }
                  refetch(); // Refresh applications
                })
                .catch((err) => {
                  console.error("Error updating user role:", err);
                  Swal.fire(
                    "Note!",
                    "User is an admin. Role was not changed.",
                    "info"
                  );
                  refetch();
                });
            } else if (status === "rejected") {
              Swal.fire(
                "Rejected",
                "Application has been rejected.",
                "info"
              );
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
                    className={`badge ${application.status === "approved"
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
                  <button
                    className="btn btn-sm btn-success mr-2"
                    onClick={() => handleStatusUpdate(application.email, "approved")}
                    disabled={application.status === "rejected"}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleStatusUpdate(application.email, "rejected")}
                    disabled={application.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

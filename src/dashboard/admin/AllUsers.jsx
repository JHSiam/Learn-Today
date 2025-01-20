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
              Swal.fire(
                "Updated!",
                "The user has been made an admin.",
                "success"
              );
              refetch(); // Refetch the users list after success
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {allUsers?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-success"
                        : user.role === "teacher"
                        ? "badge-warning"
                        : "badge-secondary"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn btn-sm btn-primary"
                    disabled={user.role === "admin"}
                  >
                    Make Admin
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

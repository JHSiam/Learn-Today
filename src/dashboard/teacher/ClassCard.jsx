import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ToastContainer } from "react-toastify"; // Only ToastContainer is imported now

export default function ClassCard({ classItem, refetch }) {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Handle Update functionality
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedClass, setUpdatedClass] = useState({
    title: classItem.title,
    price: classItem.price,
    description: classItem.description,
    image: classItem.image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClass((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosPublic.put(`/classes/${classItem._id}`, updatedClass);
      console.log("Class updated successfully:", response.data);
      setIsUpdating(false);
      refetch();

      // Show SweetAlert success message after updating
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully!',
        text: 'Your class has been updated.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Error updating class:", error);

      // Show SweetAlert error message if the update fails
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong while updating the class.',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/classes/${classItem._id}`);
          console.log(response.data.message);
          Swal.fire("Deleted!", "The class has been deleted.", "success");
          refetch(); // Optionally, trigger a state update to reflect the deletion
        } catch (error) {
          console.error("Error deleting class:", error);
          Swal.fire("Error", "Failed to delete the class.", "error");
        }
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-gray-200 p-4">
      <ToastContainer /> {/* ToastContainer should be included here */}
      <figure>
        <img
          src={classItem.image}
          alt={classItem.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold">{classItem.title}</h2>
        <p>
          <strong>Name:</strong> {classItem.name}
        </p>
        <p>
          <strong>Email:</strong> {classItem.email}
        </p>
        <p>
          <strong>Price:</strong> ${classItem.price}
        </p>
        <p>
          <strong>Description:</strong> {classItem.description.slice(0, 100)}...
        </p>
        <p>
          <strong>Status:</strong>
          <span
            className={`badge ${
              classItem.status === "approved"
                ? "badge-success"
                : classItem.status === "rejected"
                ? "badge-error"
                : "badge-warning"
            }`}
          >
            {classItem.status}
          </span>
        </p>
        <div className="flex flex-col gap-1">
          <button
            className="btn btn-sm btn-primary flex items-center gap-2"
            onClick={() => setIsUpdating(true)}
          >
            <FaEdit /> Update
          </button>
          <button
            className="btn btn-sm btn-error flex items-center gap-2"
            onClick={handleDelete}
          >
            <FaTrashAlt /> Delete
          </button>
          <button
            className="btn btn-sm btn-info flex items-center gap-2"
            onClick={() => navigate(`my-class-details/${classItem._id}`)}
          >
            <FaInfoCircle /> See Details
          </button>
        </div>
      </div>

      {/* Modal for Updating Class */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Update Class</h2>
            <form>
              {/* Title */}
              <div className="form-control mb-4">
                <label className="label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedClass.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Price */}
              <div className="form-control mb-4">
                <label className="label">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedClass.price}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Description */}
              <div className="form-control mb-4">
                <label className="label">Description</label>
                <textarea
                  name="description"
                  value={updatedClass.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              {/* Image */}
              <div className="form-control mb-4">
                <label className="label">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={updatedClass.image}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsUpdating(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

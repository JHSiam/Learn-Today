import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

export default function ClassCard({ classItem, refetch }) {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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

      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully!',
        text: 'Your class has been updated.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Error updating class:", error);

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
          refetch();
        } catch (error) {
          console.error("Error deleting class:", error);
          Swal.fire("Error", "Failed to delete the class.", "error");
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700 border border-emerald-300";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  return (
    <div className="group h-full">
      <ToastContainer />
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-purple-700/50 hover:border-purple-500">
        {/* Image Section with Overlay */}
        <div className="relative overflow-hidden h-48 bg-gradient-to-br from-purple-900 to-gray-900">
          <img
            src={classItem.image}
            alt={classItem.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                classItem.status
              )}`}
            >
              {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
            </span>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
            ${classItem.price}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-100 mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {classItem.title}
          </h2>

          {/* Instructor Info */}
          <div className="space-y-1 mb-3 pb-3 border-b border-purple-700/30">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-purple-300">By:</span> {classItem.name}
            </p>
            <p className="text-xs text-gray-400 truncate">
              <span className="font-semibold text-purple-300">Email:</span> {classItem.email}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-4 flex-1 line-clamp-3">
            {classItem.description}
          </p>

          {/* Action Buttons */}
          <div className="space-y-2 mt-auto">
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              onClick={() => setIsUpdating(true)}
            >
              <FaEdit className="group-hover/btn:scale-110 transition-transform" />
              Update
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 group/btn text-sm"
                onClick={handleDelete}
              >
                <FaTrashAlt className="group-hover/btn:scale-110 transition-transform" />
                Delete
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 group/btn text-sm"
                onClick={() => navigate(`my-class-details/${classItem._id}`)}
              >
                <FaInfoCircle className="group-hover/btn:scale-110 transition-transform" />
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Modal for Updating Class */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-purple-700/50 animate-slide-up">
            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Update Class
              </h2>
              <p className="text-sm text-gray-400 mt-1">Edit your class details below</p>
            </div>

            <form className="space-y-4">
              {/* Title */}
              <div className="form-control">
                <label className="label pb-2">
                  <span className="text-sm font-semibold text-gray-300">Class Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={updatedClass.title}
                  onChange={handleInputChange}
                  className="input input-bordered border-purple-700/50 bg-gray-800 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/30 rounded-lg w-full transition-all"
                  placeholder="Enter class title"
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label pb-2">
                  <span className="text-sm font-semibold text-gray-300">Price</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={updatedClass.price}
                  onChange={handleInputChange}
                  className="input input-bordered border-purple-700/50 bg-gray-800 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/30 rounded-lg w-full transition-all"
                  placeholder="Enter price"
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label pb-2">
                  <span className="text-sm font-semibold text-gray-300">Description</span>
                </label>
                <textarea
                  name="description"
                  value={updatedClass.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered border-purple-700/50 bg-gray-800 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/30 rounded-lg w-full h-24 transition-all"
                  placeholder="Enter class description"
                ></textarea>
              </div>

              {/* Image URL */}
              <div className="form-control">
                <label className="label pb-2">
                  <span className="text-sm font-semibold text-gray-300">Image URL</span>
                </label>
                <input
                  type="text"
                  name="image"
                  value={updatedClass.image}
                  onChange={handleInputChange}
                  className="input input-bordered border-purple-700/50 bg-gray-800 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/30 rounded-lg w-full transition-all"
                  placeholder="Enter image URL"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300"
                  onClick={() => setIsUpdating(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
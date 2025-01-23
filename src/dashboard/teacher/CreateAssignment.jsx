import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AiOutlinePlus } from "react-icons/ai";

export default function CreateAssignment({ classId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const handleCreateAssignment = async (data) => {
    try {
      const response = await axiosPublic.post("/assignments", {
        classId,
        submissionCount : 0,
        ...data,
      });
      //console.log("Assignment created successfully:", response.data);

      // Show success toast
      toast.success("Assignment created successfully!", {
        
      });

      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating assignment:", error);

      // Show error toast
      toast.error("Failed to create assignment. Please try again.", {
        
      });
    }
  };

  return (
    <div>
      {/* Toast Container */}
      <ToastContainer />

      {/* Create Button */}
      <button
        className="btn btn-primary flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <AiOutlinePlus /> Create Assignment
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Create Assignment</h2>
            <form onSubmit={handleSubmit(handleCreateAssignment)}>
              {/* Assignment Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Assignment Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("title", { required: true })}
                  placeholder="Enter assignment title"
                />
              </div>

              {/* Assignment Deadline */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Assignment Deadline</span>
                </label>
                <input
                  type="datetime-local"
                  className="input input-bordered w-full"
                  {...register("deadline", { required: true })}
                />
              </div>

              {/* Assignment Description */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Assignment Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  {...register("description", { required: true })}
                  placeholder="Enter assignment description"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

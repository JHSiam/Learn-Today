import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../authentication/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TeacherRequestForm() {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [applicationStatus, setApplicationStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: user?.email || "",
      experience: "",
      title: "",
      category: "",
      photoUrl: user?.photoURL || "",
    },
  });

  // Fetch application status
  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const response = await axiosPublic.get(
          `/teacher-application-check/${user?.email}`
        );
        setApplicationStatus(response.data?.status || null);
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    };

    if (user?.email) {
      fetchApplicationStatus();
    }
  }, [user?.email, axiosPublic]);

  const handleReapply = async () => {
    try {
      const response = await axiosPublic.put(
        `/teacher-application/${user?.email}`,
        { status: "pending" }
      );
      if (response.data.modifiedCount > 0) {
        toast.success("Reapplication submitted successfully!");
        setApplicationStatus("pending");
      } else {
        toast.error("Failed to reapply. Please try again.");
      }
    } catch (error) {
      console.error("Error reapplying:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      email: user?.email,
      status: "pending",
      photoUrl: user?.photoURL,
    };

    try {
      const response = await axiosPublic.post("/teacher-application", formData);
      if (response.data.insertedId) {
        toast.success("Application submitted successfully!");
        reset();
        setApplicationStatus("pending");
      } else if (response.data.message === "Application already exists") {
        toast.warning("You have already applied with this email.");
      } else {
        toast.error("Failed to submit the application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Apply for Teaching Position</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-1">Experience</label>
          <select
            {...register("experience", { required: "Experience is required" })}
            className={`select select-bordered w-full ${
              errors.experience ? "select-error" : ""
            }`}
          >
            <option value="">Select experience level</option>
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-Level</option>
            <option value="experienced">Experienced</option>
          </select>
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">
              {errors.experience.message}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`input input-bordered w-full ${
              errors.title ? "input-error" : ""
            }`}
            placeholder="Your teaching title (e.g., Web Developer)"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className={`select select-bordered w-full ${
              errors.category ? "select-error" : ""
            }`}
          >
            <option value="">Select a category</option>
            <option value="web development">Web Development</option>
            <option value="digital marketing">Digital Marketing</option>
            <option value="data science">Data Science</option>
            <option value="graphic design">Graphic Design</option>
            <option value="content writing">Content Writing</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit for Review
        </button>
      </form>

      {/* Reapply Button */}
      {applicationStatus === "rejected" && (
        <button
          onClick={handleReapply}
          className="btn btn-warning w-full mt-4"
        >
          Reapply
        </button>
      )}
    </div>
  );
}

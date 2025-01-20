import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth"; // Custom hook to get user details
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function AddClass() {
    const { user } = useAuth(); // Get current user details (e.g., name, email)
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // Add default status
        const classData = {
            ...data,
            email: user?.email,
            name: user?.displayName,
            enrollment: 0,
            status: "pending"
        };

        axiosPublic
            .post("/classes", classData) // Replace with your API endpoint
            .then((response) => {
                if (response.data.insertedId) {
                    Swal.fire(
                        "Class Added!",
                        "Your class has been submitted for review.",
                        "success"
                    );
                    reset(); // Reset form after successful submission
                }
            })
            .catch((error) => {
                console.error("Error adding class:", error);
                Swal.fire("Error", "Something went wrong. Please try again.", "error");
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                        placeholder="Class Title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Name (Read-only) */}
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Email (Read-only) */}
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 1, message: "Price must be at least $1" },
                        })}
                        className="input input-bordered w-full"
                        placeholder="Class Price"
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                            minLength: {
                                value: 10,
                                message: "Description must be at least 10 characters",
                            },
                        })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Class Description"
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                        type="url"
                        {...register("image", { required: "Image URL is required" })}
                        className="input input-bordered w-full"
                        placeholder="Image URL"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Add Class
                </button>
            </form>
        </div>
    );
}

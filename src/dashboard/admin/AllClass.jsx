import React from "react";
import useAllClass from "../../hooks/useAllClass";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

export default function AllClass() {
    const [allClasses, loading, refetch] = useAllClass();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleApprove = async (id) => {
        try {
            const response = await axiosPublic.put(`/classes/${id}`, {
                status: "approved",
            });

            if (response.data.modifiedCount > 0) {
                alert("Class approved successfully!");
                refetch();
            } else {
                alert("Failed to approve the class. Please try again.");
            }
        } catch (error) {
            console.error("Error approving class:", error);
            alert("An error occurred while approving the class.");
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await axiosPublic.put(`/classes/${id}`, {
                status: "rejected",
            });

            if (response.data.modifiedCount > 0) {
                alert("Class rejected successfully!");
                refetch();
            } else {
                alert("Failed to reject the class. Please try again.");
            }
        } catch (error) {
            console.error("Error rejecting class:", error);
            alert("An error occurred while rejecting the class.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Classes</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200">Title</th>
                        <th className="py-2 px-4 border-b border-gray-200">Image</th>
                        <th className="py-2 px-4 border-b border-gray-200">Email</th>
                        <th className="py-2 px-4 border-b border-gray-200">Short Description</th>
                        <th className="py-2 px-4 border-b border-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allClasses.map((classItem) => (
                        <tr key={classItem._id}>
                            <td className="py-2 px-4 border-b border-gray-200">{classItem.title}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <img
                                    src={classItem.image}
                                    alt={classItem.title}
                                    className="w-16 h-16 object-cover"
                                />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">{classItem.email}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                {classItem.description.slice(0, 50)}...
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <button
                                    className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                                    onClick={() => handleApprove(classItem._id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                                    onClick={() => handleReject(classItem._id)}
                                >
                                    Reject
                                </button>
                                <button
                                    className={`py-1 px-2 rounded ${
                                        classItem.status === "approved"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    }`}
                                    disabled={classItem.status !== "approved"}
                                    onClick={()=>navigate(`admin-class-progress/${classItem._id}`)}
                                >
                                    Progress
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

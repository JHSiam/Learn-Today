import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ApprovedClassCard from "./ApprovedClassCard";

export default function AllApprovedClass() {
  const [approvedClasses, setApprovedClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosPublic = useAxiosPublic();

  const fetchClasses = async (page) => {
    try {
      const response = await axiosPublic.get(`/all-classes/approved`, {
        params: { page, limit: 3 }, // Sending query params
      });
      setApprovedClasses(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching approved classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses(currentPage); // Fetch data whenever currentPage changes
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update the current page
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">All Approved Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedClasses.map((classData) => (
          <ApprovedClassCard key={classData._id} classData={classData} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline btn-sm"
        >
          Previous
        </button>
        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-outline btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}

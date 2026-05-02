import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ApprovedClassCard from "./ApprovedClassCard";

export default function AllApprovedClass() {
  const [approvedClasses, setApprovedClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [searchTerm, setSearchTerm] = useState("");

  const axiosPublic = useAxiosPublic();

  // Fetch data
  const fetchClasses = async (page) => {
    try {
      const response = await axiosPublic.get(`/all-classes/approved`, {
        params: { page, limit: 3 },
      });

      setApprovedClasses(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching approved classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses(currentPage);
  }, [currentPage]);

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 🔍 Filter by title
  const filteredClasses = approvedClasses.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔄 Sort after filtering
  const sortedClasses = filteredClasses.sort((a, b) => {
    return sortOrder === "low-to-high"
      ? Number(a.price) - Number(b.price)
      : Number(b.price) - Number(a.price);
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-10">
        All Approved Classes
      </h2>

      {/* Search + Sort */}
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by course title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-full md:w-1/3 rounded-lg border border-purple-400 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-lg border border-purple-400 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="low-to-high" className="text-black">
            Price: Low to High
          </option>
          <option value="high-to-low" className="text-black">
            Price: High to Low
          </option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedClasses.length > 0 ? (
          sortedClasses.map((classData) => (
            <ApprovedClassCard
              key={classData._id}
              classData={classData}
            />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-400">
            No courses found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-2 rounded-lg border border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white disabled:opacity-40 transition-all duration-300"
        >
          Previous
        </button>

        <span className="font-medium text-white">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-2 rounded-lg border border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white disabled:opacity-40 transition-all duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
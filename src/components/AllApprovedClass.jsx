import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ApprovedClassCard from "./ApprovedClassCard";

export default function AllApprovedClass() {
  const [approvedClasses, setApprovedClasses] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/all-classes/approved")
      .then((response) => setApprovedClasses(response.data))
      .catch((error) => console.error("Error fetching approved classes:", error));
  }, [axiosPublic]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">All Approved Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedClasses.map((classData) => (
          <ApprovedClassCard key={classData._id} classData={classData} />
        ))}
      </div>
    </div>
  );
}

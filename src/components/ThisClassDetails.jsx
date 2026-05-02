import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaDollarSign, FaUser, FaBook } from "react-icons/fa";

export default function ThisClassDetails() {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get(`/all-class/${id}`)
      .then((response) => setClassData(response.data))
      .catch((error) => console.error("Error fetching class details:", error));
  }, [id, axiosPublic]);

  if (!classData) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const { title, name, email, image, price, description, enrollment } = classData;

  return (
    <div className="p-6 max-w-4xl mx-auto border border-white/20 backdrop-blur-lg bg-white/5 rounded-2xl shadow-lg mt-7">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>

      {/* Description */}
      <p className="text-lg text-gray-200 mb-6">{description}</p>

      {/* Instructor & Price */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg text-gray-300 flex items-center">
          <FaUser className="text-purple-400 mr-2" />
          {name} ({email})
        </p>
        <p className="text-lg text-green-400 font-bold flex items-center">
          <FaDollarSign className="mr-1" />
          {price}
        </p>
      </div>

      {/* Enrollment Info */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-300">
          Enrolled Students: <strong>{enrollment}</strong>
        </p>
        <FaBook className="text-gray-400 text-xl" />
      </div>

      {/* Pay Button - Matches Become A Teacher style */}
      <button
        onClick={() => navigate(`/payment/${id}`)}
        className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Pay
      </button>
    </div>
  );
}

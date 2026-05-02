import React from "react";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ApprovedClassCard({ classData }) {
  const { _id, title, name, image, price, description, enrollment } = classData;
  const navigate = useNavigate();

  return (
    <div className="rounded-xl p-5 border border-white/20 backdrop-blur-lg bg-white/5 shadow-lg hover:scale-[1.02] transition-all duration-300">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover rounded-lg mb-4 shadow-md"
      />

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

      {/* Instructor */}
      <p className="text-sm text-gray-300 mb-2 flex items-center">
        <FaUser className="mr-2 text-purple-400" /> {name}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-200 mb-4 line-clamp-3">{description}</p>

      {/* Price & Enrollment */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-green-400 flex items-center">
          <FaDollarSign className="mr-1" /> {price}
        </span>
        <span className="text-sm text-gray-300">
          Enrolled: <strong>{enrollment}</strong>
        </span>
      </div>

      {/* Enroll Button - Matches Become A Teacher */}
      <button
        onClick={() => navigate(`/this-class-details/${_id}`)}
        className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full"
      >
        Enroll
      </button>
    </div>
  );
}

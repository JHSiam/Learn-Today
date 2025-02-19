import React from "react";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ApprovedClassCard({ classData }) {
  const {_id, title, name, image, price, description, enrollment } = classData;
  const navigate = useNavigate();


  return (
    <div className="card bg-purple-400 shadow-md rounded-lg p-4">
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2 flex items-center">
        <FaUser className="mr-2 text-blue-500" /> {name}
      </p>
      <p className="text-sm text-gray-800 mb-4">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-green-600 flex items-center">
          <FaDollarSign className="mr-1" /> {price}
        </span>
        <span className="text-sm text-gray-600">
          Enrolled: <strong>{enrollment}</strong>
        </span>
      </div>
      <button className="btn btn-primary w-full" onClick={()=>navigate(`/this-class-details/${_id}`)}>Enroll</button>
    </div>
  );
}

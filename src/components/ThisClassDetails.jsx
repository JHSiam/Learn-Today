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
    return <div>Loading...</div>;
  }

  const { title, name, email, image, price, description, enrollment } = classData;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-blue-300 rounded-lg shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg flex items-center">
          <FaUser className="text-blue-500 mr-2" />
          {name} ({email})
        </p>
        <p className="text-lg text-green-600 flex items-center">
          <FaDollarSign className="mr-1" />
          {price}
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Enrolled Students: <strong>{enrollment}</strong>
        </p>
        <FaBook className="text-gray-400 text-xl" />
      </div>
      <button className="btn btn-primary w-full py-2 text-lg" onClick={()=>navigate(`/payment/${id}`)}>Pay</button>
    </div>
  );
}

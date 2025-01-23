import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EnrolledClassCard = ({ title, name, image, classId }) => {
    const navigate = useNavigate();
  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <figure>
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">
          <strong>Instructor:</strong> {name}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm flex items-center" onClick={()=>navigate(`my-enroll-class-details/${classId}`)}>
            Continue <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrolledClassCard;

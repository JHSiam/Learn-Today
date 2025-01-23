import React from "react";
import { FaEdit, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ClassCard({ classItem }) {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 shadow-xl border border-gray-200 p-4">
      <figure>
        <img
          src={classItem.image}
          alt={classItem.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold">{classItem.title}</h2>
        <p>
          <strong>Name:</strong> {classItem.name}
        </p>
        <p>
          <strong>Email:</strong> {classItem.email}
        </p>
        <p>
          <strong>Price:</strong> ${classItem.price}
        </p>
        <p>
          <strong>Description:</strong> {classItem.description.slice(0, 100)}...
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`badge ${
              classItem.status === "approved"
                ? "badge-success"
                : classItem.status === "rejected"
                ? "badge-error"
                : "badge-warning"
            }`}
          >
            {classItem.status}
          </span>
        </p>
        <div className="flex gap-1">
          <button className="btn btn-sm btn-primary flex items-center gap-2">
            <FaEdit /> Update
          </button>
          <button className="btn btn-sm btn-error flex items-center gap-2">
            <FaTrashAlt /> Delete
          </button>
          <button className="btn btn-sm btn-info flex items-center gap-2" onClick={()=>navigate(`my-class-details/${classItem._id}`)}>
            <FaInfoCircle /> See Details
          </button>
        </div>
      </div>
    </div>
  );
}

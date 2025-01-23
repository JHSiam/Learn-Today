import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function MyEnrolledClassDetails() {
  const { id } = useParams(); // Class ID
  const axiosPublic = useAxiosPublic();
  const [assignments, setAssignments] = useState([]);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch assignments for the class
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axiosPublic.get(`/assignments/${id}`);
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [axiosPublic, id]);

  // Handle form submission for a specific assignment
  const handleSubmission = async (data) => {
    console.log("Form Data:", data); // Debugging: Log form data

    const { submissionText, assignmentId } = data;

    if (!submissionText) {
      Swal.fire({
        icon: "warning",
        title: "Submission cannot be empty!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      // Post submission to SubmitedAssignments and increment submissionCount
      await axiosPublic.post("/submit-assignment", {
        assignmentId,
        classId: id,
        submissionText,
      });

      // Show success toast
      Swal.fire({
        icon: "success",
        title: "Submission successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Reset the form field for this specific assignment
      resetField(`submissionText_${assignmentId}`);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      Swal.fire({
        icon: "error",
        title: "Submission failed!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assignments for Class {id}</h1>
      {assignments.length === 0 ? (
        <p>No assignments available for this class.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Submission</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{new Date(assignment.deadline).toLocaleString()}</td>
                <td>
                  <form
                    onSubmit={handleSubmit((data) =>
                      handleSubmission({
                        ...data,
                        assignmentId: assignment._id,
                      })
                    )}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      className={`input input-bordered w-full ${
                        errors[`submissionText_${assignment._id}`]
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder="Enter your submission"
                      {...register(`submissionText`, {
                        required: "Submission is required",
                      })}
                    />
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                  {errors[`submissionText_${assignment._id}`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`submissionText_${assignment._id}`]?.message}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

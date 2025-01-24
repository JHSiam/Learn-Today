import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import TeacherEvalutation from "./TeacherEvalutation";

export default function MyEnrolledClassDetails() {
  const { id } = useParams(); // Class ID
  const axiosPublic = useAxiosPublic();
  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [error, setError] = useState("");

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
  const handleSubmission = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    if (!submissionText.trim()) {
      setError("Submission cannot be empty!");
      return;
    }

    try {
      // Post submission to SubmitedAssignments and increment submissionCount
      await axiosPublic.post("/submit-assignment", {
        assignmentId: currentAssignmentId,
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

      setShowModal(false); // Close the modal after submission
      setCurrentAssignmentId(null); // Clear the current assignment ID
      setSubmissionText(""); // Reset submission text field
      setError(""); // Clear any previous errors
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

  const openModal = (assignmentId) => {
    setCurrentAssignmentId(assignmentId);
    setShowModal(true); // Show modal when clicking the submit button
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when cancel or submit is clicked
    setCurrentAssignmentId(null); // Reset assignment ID
    setSubmissionText(""); // Reset submission text field
    setError(""); // Clear any previous errors
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
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
              <th>Action</th>
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
                  <button
                    onClick={() => openModal(assignment._id)}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Assignment Submission */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
            <form onSubmit={handleSubmission}>
              <div className="form-control mb-4">
                <label className="label">Your Submission</label>
                <textarea
                  className={`textarea textarea-bordered w-full ${
                    error ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your submission"
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                ></textarea>
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <TeacherEvalutation classId={id}></TeacherEvalutation>
    </div>
  );
}

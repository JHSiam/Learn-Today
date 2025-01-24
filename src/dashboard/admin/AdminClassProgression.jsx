import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';

export default function AdminClassProgression() {
    const {classId} = useParams();
  const axiosPublic = useAxiosPublic();

  const [totalEnrollment, setTotalEnrollment] = useState(0); // Total enrollment count
  const [totalAssignments, setTotalAssignments] = useState(0); // Total assignments count
  const [totalSubmissions, setTotalSubmissions] = useState(0); // Total submissions count

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total enrollment
        const classResponse = await axiosPublic.get(`/all-class/${classId}`);
        setTotalEnrollment(classResponse.data.enrollment || 0);

        // Fetch total assignments
        const assignmentsResponse = await axiosPublic.get(`/assignments/class/${classId}`);
        setTotalAssignments(assignmentsResponse.data.total || 0);

        // Fetch total assignment submissions
        const submissionsResponse = await axiosPublic.get(`/submissions/class/${classId}`);
        setTotalSubmissions(submissionsResponse.data.total || 0);
      } catch (error) {
        console.error('Error fetching class progress data:', error);
      }
    };

    if (classId) {
      fetchData();
    }
  }, [classId, axiosPublic]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Enrollment Card */}
      <div className="card bg-blue-100 shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Total Enrollment</h3>
        <p className="text-2xl font-bold">{totalEnrollment}</p>
      </div>

      {/* Total Assignments Card */}
      <div className="card bg-green-100 shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Total Assignments</h3>
        <p className="text-2xl font-bold">{totalAssignments}</p>
      </div>

      {/* Total Submissions Card */}
      <div className="card bg-yellow-100 shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Total Assignment Submissions</h3>
        <p className="text-2xl font-bold">{totalSubmissions}</p>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { FaUsers, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';

export default function TotalStats() {
  const axiosPublic = useAxiosPublic();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalEnrollment, setTotalEnrollment] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axiosPublic.get('/users', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        });
        setTotalUsers(usersResponse.data.length);

        const classesResponse = await axiosPublic.get('/classes');
        setTotalClasses(classesResponse.data.length);

        const enrollmentResponse = await axiosPublic.get('/my-enrolled-classes');
        setTotalEnrollment(enrollmentResponse.data.length);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  return (
    <div className="p-8 bg-black/70 rounded-3xl shadow-lg shadow-purple-700/40 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
        Overview
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
        {/* Stats Cards */}
        <div className="flex flex-col space-y-6 w-full md:w-1/2">
          {/* Total Users */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl shadow-xl p-6 flex items-center space-x-5 hover:shadow-purple-500/70 transition-shadow duration-300">
            <FaUsers className="text-4xl" />
            <div>
              <h2 className="text-2xl font-semibold">Total Users</h2>
              <p className="text-center text-lg mt-1">{totalUsers}</p>
            </div>
          </div>

          {/* Total Classes */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl shadow-xl p-6 flex items-center space-x-5 hover:shadow-purple-500/70 transition-shadow duration-300">
            <FaChalkboardTeacher className="text-4xl" />
            <div>
              <h2 className="text-2xl font-semibold">Total Classes</h2>
              <p className="text-center text-lg mt-1">{totalClasses}</p>
            </div>
          </div>

          {/* Total Enrollment */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl shadow-xl p-6 flex items-center space-x-5 hover:shadow-indigo-500/70 transition-shadow duration-300">
            <FaUserGraduate className="text-4xl" />
            <div>
              <h2 className="text-2xl font-semibold">Total Enrollment</h2>
              <p className="text-center text-lg mt-1">{totalEnrollment}</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/02/how-to-create-online-course.png"
            alt="Website Overview"
            className="w-full h-auto rounded-2xl shadow-2xl shadow-purple-900/60"
          />
        </div>
      </div>
    </div>
  );
}

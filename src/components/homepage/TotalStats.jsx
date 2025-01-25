import React, { useEffect, useState } from 'react'
import { FaUsers, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa'
import useAxiosPublic from '../../hooks/useAxiosPublic'

export default function TotalStats() {
  const axiosPublic = useAxiosPublic()
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalClasses, setTotalClasses] = useState(0)
  const [totalEnrollment, setTotalEnrollment] = useState(0)

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axiosPublic.get('/users', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`
          }
        })
        setTotalUsers(usersResponse.data.length)

        const classesResponse = await axiosPublic.get('/classes')
        setTotalClasses(classesResponse.data.length)

        const enrollmentResponse = await axiosPublic.get('/my-enrolled-classes')
        setTotalEnrollment(enrollmentResponse.data.length)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchData()
  }, [axiosPublic])

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Website Overview</h1>

      <div className="flex justify-between items-center space-x-8">
        {/* Left Side - Stats Cards */}
        <div className="flex flex-col space-y-4 w-1/2">
          {/* Total Users Card */}
          <div className="card w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-xl">
            <div className="card-body flex items-center space-x-4">
              <FaUsers className="text-3xl" />
              <div>
                <h2 className="card-title">Total Users</h2>
                <p className='text-center'>{totalUsers}</p>
              </div>
            </div>
          </div>

          {/* Total Classes Card */}
          <div className="card w-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-xl">
            <div className="card-body flex items-center space-x-4">
              <FaChalkboardTeacher className="text-3xl" />
              <div>
                <h2 className="card-title">Total Classes</h2>
                <p className='text-center'>{totalClasses}</p>
              </div>
            </div>
          </div>

          {/* Total Enrollment Card */}
          <div className="card w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-xl">
            <div className="card-body flex items-center space-x-4">
              <FaUserGraduate className="text-3xl" />
              <div>
                <h2 className="card-title">Total Enrollment</h2>
                <p className='text-center'>{totalEnrollment}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2">
          <img
            src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/02/how-to-create-online-course.png"
            alt="Website Overview"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  )
}

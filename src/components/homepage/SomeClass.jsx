import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const Card = ({ classData }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-purple-400 text-white rounded-lg shadow-lg overflow-hidden p-4">
      <img
        src={classData.image}
        alt={classData.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{classData.title}</h2>
      <p className="mb-2">{classData.description}</p>
      <p className="font-semibold mb-2">Instructor: {classData.name}</p>
      <p className="mb-2">Enrollment: {classData.enrollment}</p>
      <p className="font-bold mb-4">Price: ${classData.price}</p>
      <button onClick={()=>navigate('/classes')} className="btn btn-primary font-semibold px-4 py-2 rounded-md hover:bg-purple-300 transition">
        Learn More
      </button>
    </div>
  );
};

export default function SomeClass() {
  const axiosPublic = useAxiosPublic();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosPublic.get('/all-classes-home/approved');
        const sortedClasses = response.data
          .sort((a, b) => b.enrollment - a.enrollment) // Sort by enrollment in descending order
          .slice(0, 3); // Take the top 3 classes
        setClasses(sortedClasses);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, [axiosPublic]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Top Enrolled Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((classData) => (
          <Card key={classData._id} classData={classData} />
        ))}
      </div>
    </div>
  );
}

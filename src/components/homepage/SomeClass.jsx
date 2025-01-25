import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Card = ({ classData }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-lg shadow-lg overflow-hidden p-4">
      <img
        src={classData.image}
        alt={classData.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{classData.title}</h2>
      <p className="mb-2">{classData.description}</p>
      <p className="font-semibold mb-2">Instructor: {classData.name}</p>
      <p className="mb-2">Enrollment: {classData.enrollment}</p>
      <p className="font-bold">Price: ${classData.price}</p>
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
      <h1 className="text-3xl font-bold text-center mb-8">Top Approved Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((classData) => (
          <Card key={classData._id} classData={classData} />
        ))}
      </div>
    </div>
  );
}

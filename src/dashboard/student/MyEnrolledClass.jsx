import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import EnrolledClassCard from "./EnrolledClassCard";

const MyEnrolledClass = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/my-enrolled-class/${user.email}`)
        .then((response) => {
          setClasses(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching enrolled classes:", error);
          setLoading(false);
        });
    }
  }, [user?.email, axiosPublic]);

  if (loading) {
    return <div className="text-center mt-10">Loading classes...</div>;
  }

  if (classes.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        You have not enrolled in any classes yet.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Enrolled Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classData) => (
          <EnrolledClassCard
            key={classData._id}
            title={classData.title}
            name={classData.instructor}
            image={classData.image}
            classId={classData.classId}
          />
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledClass;

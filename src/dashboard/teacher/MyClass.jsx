import React from "react";
import useMyClass from "../../hooks/useMyClass";
import ClassCard from "./ClassCard"; // Importing the ClassCard component

export default function MyClass() {
  const [myClasses, loading, refetch] = useMyClass();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Classes</h1>
      {myClasses.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myClasses.map((classItem) => (
            <ClassCard key={classItem._id} classItem={classItem} refetch = {refetch}/>
          ))}
        </div>
      )}
    </div>
  );
}

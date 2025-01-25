import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

export default function ProfileInfo() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosPublic.get(`/users/${user.email}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (user?.email) {
      fetchProfileData();
    }
  }, [user?.email, axiosPublic]);

  if (!profileData) {
    return <div className="text-center mt-4">Loading profile information...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-white">
      <div className="flex flex-col items-center">
        <img
          src={profileData.photoURL}
          alt={`${profileData.name}'s profile`}
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <h2 className="text-2xl font-bold mt-4">{profileData.name}</h2>
        <p className="text-lg italic mt-1">{profileData.role}</p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="font-semibold">Email:</p>
          <p>{profileData.email}</p>
        </div>
        <div>
          <p className="font-semibold">Phone:</p>
          <p>{profileData.phone || "Not provided"}</p>
        </div>
      </div>
    </div>
  );
}

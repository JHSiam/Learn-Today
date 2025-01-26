import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTeacherApplication = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: teacherApplications = [], // Data from API
    isLoading: loading,             // Loading state
    refetch,                        // Function to refetch data
  } = useQuery({
    queryKey: ["teacherApplications"],
    queryFn: async () => {
      const res = await axiosPublic.get("/teacher-application",{
        headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
    });
      return res.data; // Return the fetched data
    },
  });

  return [teacherApplications, loading, refetch];
};

export default useTeacherApplication;

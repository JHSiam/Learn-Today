import { useQuery } from "@tanstack/react-query";
//import useAxiosPublic from "./useAxiosPublic";
import useAxiosPublic from "./useAxiosPublic";

const useTeacherApplication = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: teacherApplications = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["teacherApplications"], // Query key
    queryFn: async () => {
      const res = await axiosPublic.get("/teacher-application");
      return res.data; // Return the response data
    },
  });

  return [teacherApplications, loading, refetch];
};

export default useTeacherApplication;

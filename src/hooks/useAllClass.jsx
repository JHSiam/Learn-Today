import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllClass = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allClasses = [], // Data from API
    isLoading: loading,    // Loading state
    refetch,               // Function to refetch data
  } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes");
      return res.data; // Return the fetched data
    },
  });

  return [allClasses, loading, refetch];
};

export default useAllClass;

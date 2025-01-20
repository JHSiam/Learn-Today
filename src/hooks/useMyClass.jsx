import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import useAuth from "./useAuth";

const useMyClass = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth()

  const { data: myClasses = [], isLoading: loading, refetch } = useQuery({
    queryKey: ["myClasses", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosPublic.get(`/classes/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Ensure the query doesn't run without a valid email
  });

  return [myClasses, loading, refetch];
};

export default useMyClass;

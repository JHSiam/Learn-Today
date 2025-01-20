import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useTeacher = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
    queryKey: [user?.email, "isTeacher"],
    enabled: !loading, // Ensures query runs only when the user is authenticated
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/teacher/${user.email}`);
      return res.data?.teacher; // Return whether the user is a teacher
    },
  });

  return [isTeacher, isTeacherLoading];
};

export default useTeacher;

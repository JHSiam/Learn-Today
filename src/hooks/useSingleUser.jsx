// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";

const useSingleUser = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
  
    const {data: SingleUser={}, isPending: loading, refetch} = useQuery({
        queryKey: ['singleusers'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`users/${user?.email}`);
            return res.data;
        }
    })


    return [SingleUser, loading, refetch]
}

export default useSingleUser;
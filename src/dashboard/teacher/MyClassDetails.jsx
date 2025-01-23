import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CreateAssignment from './CreateAssignment';

export default function MyClassDetails() {
  const axiosPublic = useAxiosPublic();
  const {id} = useParams();
  return (
    <div>MyClassDetails
      <CreateAssignment classId = {id}></CreateAssignment>
    </div>
  )
}

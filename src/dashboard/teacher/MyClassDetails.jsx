import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CreateAssignment from './CreateAssignment';
import ClassProgress from './ClassProgress';

export default function MyClassDetails() {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [totalAssignments, setTotalAssignments] = useState(0);
  return (
    <div>MyClassDetails
      <ClassProgress classId={id} totalAssignments={totalAssignments} setTotalAssignments={setTotalAssignments}></ClassProgress>
      <CreateAssignment classId={id} setTotalAssignments={setTotalAssignments} totalAssignments={totalAssignments}></CreateAssignment>
    </div>
  )
}

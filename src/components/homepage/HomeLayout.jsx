import React from 'react'
import Slider from './Slider'
import PartnersSection from './PatnersSection'
import SomeClass from './SomeClass'
import Feedback from './FeedBack'
import TotalStats from './TotalStats'
import JoinAsTeacher from './JoinAsTeacher'
import PremiumSection from './PremiumSection'
import JoinAsStudents from './JoinAsStudents'

export default function HomeLayout() {
  return (
    <div className='flex flex-col gap-8'>
        <Slider></Slider>
        <PartnersSection></PartnersSection>
        <SomeClass></SomeClass>
        <Feedback></Feedback>
        <TotalStats></TotalStats>
        <JoinAsTeacher></JoinAsTeacher>
        <PremiumSection></PremiumSection>
        <JoinAsStudents></JoinAsStudents>
    </div>
  )
}

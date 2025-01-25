import React from 'react'
import Slider from './Slider'
import PartnersSection from './PatnersSection'
import SomeClass from './SomeClass'
import Feedback from './FeedBack'
import TotalStats from './TotalStats'
import JoinAsTeacher from './JoinAsTeacher'

export default function HomeLayout() {
  return (
    <div className='mt-[80px]'>
        <Slider></Slider>
        <PartnersSection></PartnersSection>
        <SomeClass></SomeClass>
        <Feedback></Feedback>
        <TotalStats></TotalStats>
        <JoinAsTeacher></JoinAsTeacher>
    </div>
  )
}

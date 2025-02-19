import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Slider() {
    const naviage = useNavigate();
    return (
        <div
            className="hero min-h-screen mt-8"
            style={{
                backgroundImage: "url(https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Well Come to LearnToday</h1>
                    <p className="mb-5">
                        "At EduLearn, we believe that knowledge has the power to change lives. Our mission is to provide accessible, high-quality education that helps learners develop skills, achieve their goals, and shape a better future. Whether you're starting your journey or advancing your career, we're here to support your growth every step of the way."
                    </p>
                    <button className="btn btn-primary" onClick={()=>naviage('/classes')}>Get Started</button>
                </div>
            </div>
        </div>
    )
}
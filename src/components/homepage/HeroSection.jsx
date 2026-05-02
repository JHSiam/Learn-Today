import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";




const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <section className="relative z-10 py-20 px-6 md:px-12 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Master New Skills with
            <span className="text-purple-400"> Our E-Learning Platform</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg">
            Learn from industry experts anytime, anywhere. Access hundreds of
            interactive courses, real-world projects, and personalized learning paths
            designed just for you.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300" onClick={()=>navigate('/classes')}>
              Get Started
            </button>
            <button className="flex items-center gap-2 px-6 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg font-semibold hover:scale-105 transition-all duration-300" onClick={()=>navigate('/classes')}>
              <FaPlayCircle className="text-purple-400 text-xl" /> Watch Demo
            </button>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="relative">
          <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4 rounded-2xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-500">
            <img
              src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80"
              alt="E-learning Illustration"
              className="rounded-xl object-cover"
            />
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 rounded-2xl bg-purple-500/20 blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

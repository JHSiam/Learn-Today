import React from 'react';

export default function JoinAsTeacher() {
  return (
    <div className="p-12 mt-12 rounded-3xl max-w-7xl mx-auto backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 lg:space-x-28">
        {/* Left Side - Text Section */}
        <div className="text-center md:text-left w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
            Inspire the Next Generation of Learners!
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Join our platform as a teacher and share your knowledge with eager students.
            Whether you're an expert in any field or passionate about teaching, we offer
            the tools and support to help you succeed.
          </p>
          <a
            href="/teach"
            className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-purple-500/40 transition duration-300"
          >
            Become a Teacher
          </a>
        </div>

        {/* Right Side - Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://media.istockphoto.com/id/1433288801/photo/you-all-know-the-answer-to-my-question.jpg?s=612x612&w=0&k=20&c=rfF4RwTOFjEJvfL2GmYcXpLEOswfL4K_nsazeaZMPFc="
            alt="Inspiring Teacher"
            className="w-full h-auto rounded-2xl shadow-2xl shadow-purple-900/70"
          />
        </div>
      </div>
    </div>
  );
}

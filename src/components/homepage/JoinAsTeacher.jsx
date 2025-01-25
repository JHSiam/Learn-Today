import React from 'react'

export default function JoinAsTeacher() {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-12 mt-12 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Left Side - Text Section */}
        <div className="text-center md:text-left w-full md:w-1/2">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Inspire the Next Generation of Learners!
          </h2>
          <p className="text-lg text-white mb-6">
            Join our platform as a teacher and share your knowledge with eager students.
            Whether you're an expert in any field or passionate about teaching, we offer
            the tools and support to help you succeed.
          </p>
          <a
            href="/teach"
            className="inline-block bg-white text-orange-500 font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300"
          >
            Become a Teacher
          </a>
        </div>

        {/* Right Side - Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://media.istockphoto.com/id/1433288801/photo/you-all-know-the-answer-to-my-question.jpg?s=612x612&w=0&k=20&c=rfF4RwTOFjEJvfL2GmYcXpLEOswfL4K_nsazeaZMPFc="
            alt="Inspiring Teacher"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  )
}

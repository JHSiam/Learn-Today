import { FaChalkboardTeacher, FaUsers, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-base-100 py-12 px-6 md:px-12 lg:px-24 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-6">About Us</h2>
        <p className="text-lg text-gray-500 mb-8">
          Welcome to <span className="font-semibold text-secondary">EduLearn</span>, your ultimate online learning platform. 
          Our mission is to provide high-quality education to students worldwide, empowering them with knowledge 
          and skills for the future.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-200 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform">
          <FaChalkboardTeacher className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent">Expert Instructors</h3>
          <p className="text-gray-500 mt-2">Learn from industry experts with years of experience.</p>
        </div>

        <div className="card bg-base-200 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform">
          <FaUsers className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent">Community Support</h3>
          <p className="text-gray-500 mt-2">Join a vibrant learning community and grow together.</p>
        </div>

        <div className="card bg-base-200 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform">
          <FaRocket className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent">Career Growth</h3>
          <p className="text-gray-500 mt-2">Unlock new opportunities and advance your career.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

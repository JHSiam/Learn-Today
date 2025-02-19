import React from "react";
import { FaStar, FaRocket, FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";

const PremiumSection = () => {
  return (
    <div className="bg-purple-400 text-white py-16 px-6 lg:px-20 rounded-2xl shadow-xl">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 flex justify-center items-center">
          <FaCrown className="text-yellow-300 mr-2" /> Unlock Premium Features
        </h2>
        <p className="text-lg">
          Take your learning or teaching experience to the next level with our
          exclusive premium features.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
        >
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 text-3xl mr-4" />
            <h3 className="text-xl font-bold">Exclusive Content</h3>
          </div>
          <p>
            Gain access to premium courses, detailed tutorials, and advanced
            learning resources available only to premium members.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
        >
          <div className="flex items-center mb-4">
            <FaRocket className="text-purple-600 text-3xl mr-4" />
            <h3 className="text-xl font-bold">Faster Support</h3>
          </div>
          <p>
            Enjoy priority customer support to ensure a seamless learning or
            teaching experience, available 24/7 for premium users.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
        >
          <div className="flex items-center mb-4">
            <FaCrown className="text-pink-500 text-3xl mr-4" />
            <h3 className="text-xl font-bold">Certification</h3>
          </div>
          <p>
            Get exclusive certifications to showcase your expertise and boost
            your career opportunities.
          </p>
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12"
      >
        <button className="btn btn-primary btn-lg text-lg font-semibold hover:scale-105 transform transition">
          Upgrade to Premium
        </button>
      </motion.div>
    </div>
  );
};

export default PremiumSection;

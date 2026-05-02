import React from "react";
import { FaStar, FaRocket, FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";

const PremiumSection = () => {
  return (
    <div className="py-16 px-6 lg:px-20 rounded-2xl shadow-xl max-w-7xl mx-auto backdrop-blur-md bg-black bg-opacity-20 text-white">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 flex justify-center items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
          <FaCrown className="text-yellow-300" /> Unlock Premium Features
        </h2>
        <p className="text-gray-300">
          Take your learning or teaching experience to the next level with our
          exclusive premium features.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[ 
          { icon: <FaStar className="text-yellow-400 text-3xl mr-4" />, title: "Exclusive Content", desc: "Gain access to premium courses, detailed tutorials, and advanced learning resources available only to premium members." },
          { icon: <FaRocket className="text-purple-400 text-3xl mr-4" />, title: "Faster Support", desc: "Enjoy priority customer support to ensure a seamless learning or teaching experience, available 24/7 for premium users." },
          { icon: <FaCrown className="text-pink-400 text-3xl mr-4" />, title: "Certification", desc: "Get exclusive certifications to showcase your expertise and boost your career opportunities." }
        ].map(({icon, title, desc}, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: i === 1 ? 50 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="p-6 rounded-lg shadow-lg hover:shadow-purple-600/40 transform hover:scale-105 transition bg-white/10 backdrop-blur-md text-white"
          >
            <div className="flex items-center mb-4">{icon}
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-gray-300">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12"
      >
        <button className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-purple-500/40 transition duration-300">
          Upgrade to Premium
        </button>
      </motion.div>
    </div>
  );
};

export default PremiumSection;

import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBook, FaChalkboardTeacher } from "react-icons/fa";

const JoinAsStudents = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto text-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Join Us as a Student
        </motion.h2>
        <motion.p
          className="text-lg mb-10 max-w-2xl mx-auto text-gray-300"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          Unlock the gateway to knowledge! Enroll in our premium courses, learn
          from experienced instructors, and excel in your field.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="bg-white bg-opacity-10 text-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-purple-500/50 transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaUserGraduate className="text-6xl text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Learn at Your Pace</h3>
            <p className="text-sm">
              Access self-paced courses to master skills at your convenience.
            </p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div
            className="bg-white bg-opacity-10 text-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-purple-500/50 transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FaBook className="text-6xl text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Extensive Resources</h3>
            <p className="text-sm">
              Get access to a wide range of materials and projects to enhance
              your learning.
            </p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div
            className="bg-white bg-opacity-10 text-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-purple-500/50 transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaChalkboardTeacher className="text-6xl text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p className="text-sm">
              Learn directly from top instructors with years of experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsStudents;

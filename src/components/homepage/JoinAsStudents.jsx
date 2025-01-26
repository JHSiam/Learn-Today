import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBook, FaChalkboardTeacher } from "react-icons/fa";

const JoinAsStudents = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 px-6">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Join Us as a Student
        </motion.h2>
        <motion.p
          className="text-lg mb-10 max-w-2xl mx-auto"
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
            className="bg-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaUserGraduate className="text-6xl text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Learn at Your Pace</h3>
            <p className="text-sm">
              Access self-paced courses to master skills at your convenience.
            </p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div
            className="bg-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FaBook className="text-6xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Extensive Resources</h3>
            <p className="text-sm">
              Get access to a wide range of materials and projects to enhance
              your learning.
            </p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div
            className="bg-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaChalkboardTeacher className="text-6xl text-pink-500 mb-4" />
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

import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaStar } from 'react-icons/fa';

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="w-80 mx-auto p-6 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-600/50 transition-all duration-300 flex flex-col items-center">
      <img
        src={feedback.image}
        alt={feedback.name}
        className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-md mb-4"
      />
      <h3 className="text-lg font-bold mb-1">{feedback.name}</h3>
      <h4 className="text-sm italic text-purple-200 mb-3">{feedback.classTitle}</h4>
      <p className="text-center mb-4 text-sm leading-relaxed">{feedback.description}</p>
      <div className="flex gap-1">
        {Array.from({ length: feedback.rating }, (_, index) => (
          <FaStar key={index} className="text-yellow-300 drop-shadow" />
        ))}
      </div>
    </div>
  );
};

export default function Feedback() {
  const axiosPublic = useAxiosPublic();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosPublic.get('/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [axiosPublic]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text mb-10">
        Students Feedback
      </h1>
      <div className="carousel w-full space-x-6">
        {feedbacks.map((feedback, index) => (
          <div
            key={feedback._id}
            id={`slid${index}`}
            className="carousel-item w-full flex justify-center"
          >
            <FeedbackCard feedback={feedback} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-6">
        {feedbacks.map((_, index) => (
          <a
            href={`#slid${index}`}
            key={index}
            className="btn btn-xs rounded-full bg-purple-500 border-none hover:bg-indigo-500 text-white transition-all duration-300"
          >
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
}

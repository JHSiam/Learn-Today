import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaStar } from 'react-icons/fa';

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="w-80 mx-auto p-6 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg flex flex-col items-center">
      <img
        src={feedback.image}
        alt={feedback.name}
        className="w-20 h-20 object-cover rounded-full border-4 border-white mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{feedback.name}</h3>
      <h4 className="text-sm italic mb-2">{feedback.classTitle}</h4>
      <p className="text-center mb-4 text-sm">{feedback.description}</p>
      <div className="flex gap-1">
        {Array.from({ length: feedback.rating }, (_, index) => (
          <FaStar key={index} className="text-yellow-400" />
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Teacher Feedback</h1>
      <div className="carousel w-full space-x-4">
        {feedbacks.map((feedback, index) => (
          <div id={`slid${index}`} className="carousel-item w-full flex justify-center">
            <FeedbackCard key={feedback._id} feedback={feedback} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {feedbacks.map((_, index) => (
          <a href={`#slid${index}`} key={index} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
}

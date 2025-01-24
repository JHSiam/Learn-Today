import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';

export default function TeacherEvaluation({ classId }) {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth(); // Assume this provides the logged-in user's details
    const [rating, setRating] = useState(0); // State to hold rating
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    const [classTitle, setClassTitle] = useState(''); // State for class title
    const { register, handleSubmit, reset } = useForm(); // React Hook Form

    // Fetch class data by classId
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axiosPublic.get(`/all-class/${classId}`);
                setClassTitle(response.data.title); // Assuming the response contains the class title in "title"
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };

        if (classId) {
            fetchClassData();
        }
    }, [classId, axiosPublic]);

    // Handle Rating Change
    const handleRatingChange = (rate) => {
        setRating(rate); // Update rating state
    };

    // Handle Form Submit
    const onSubmit = async (data) => {
        const feedback = {
            ...data,
            classId,
            classTitle,
            rating,
            name: user.displayName, // Name of the user
            image: user.photoURL, // User profile picture
        };

        try {
            const response = await axiosPublic.post('/user-feedback', feedback);
            console.log('Feedback submitted successfully:', response.data);
            toast.success('Feedback submitted successfully');
            reset();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div>
            <ToastContainer></ToastContainer>
            {/* Button to Open Modal */}
            <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
            >
                Create Teaching Evaluation Report (TER)
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">
                            Teaching Evaluation Report for {classTitle || 'Class'}
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Description */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    {...register('description', { required: true })}
                                    placeholder="Enter your feedback description"
                                ></textarea>
                            </div>

                            {/* Rating */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <Rating
                                    onClick={handleRatingChange}
                                    ratingValue={rating}
                                    size={25}
                                    fillColor="gold"
                                    allowHover={true}
                                    style={{ transform: "rotate(90deg)" }}
                                    className="ml-8"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit Feedback
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

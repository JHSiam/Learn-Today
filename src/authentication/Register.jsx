import React, { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function Register() {
    const { createNewUser, setUser, updateUserProfile, logInWithGoogle } =
        useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const axiosPublic = useAxiosPublic();

    function handleRegistration(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must have at least:\n- One uppercase letter\n- One lowercase letter\n- A minimum of 6 characters."
            );
            return;
        } else {
            setPasswordError("");
        }

        // Create new user
        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);

                //send user to database
                const dbuser = {
                    name,
                    email,
                    photoURL,
                    role: 'student',
                    phone: '+88098'

                }

                axiosPublic.post('/users', dbuser)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    })

                // Update user profile
                updateUserProfile({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        toast.success("Registration successful! Redirecting...", {
                            position: "top-center",
                        });

                        // Delay navigation to allow the toast to display
                        setTimeout(() => {
                            navigate("/");
                        }, 2000); // 2-second delay
                    })
                    .catch((err) => {
                        toast.error(`Failed to update profile: ${err.message}`, {
                            position: "top-center",
                        });
                    });
            })
            .catch((err) => {
                toast.error(`Registration failed: ${err.message}`, {
                    position: "top-center",
                });
            });
    }

    function handleGoogleLogin() {
        logInWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Registered successfully with Google! Redirecting...", {
                    position: "top-center",
                });

                //send user to database
                const dbuser = {
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    role: 'student',
                    phone: '+88098'

                }
                

                axiosPublic.post('/users', dbuser)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    })

                // Delay navigation
                setTimeout(() => {
                    navigate("/");
                }, 2000); // 2-second delay
            })
            .catch((err) => {
                toast.error(`Google registration failed: ${err.message}`, {
                    position: "top-center",
                });
            });
    }

    return (
        <div className="min-h-screen bg-green-300 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md py-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create an Account
                </h2>
                <form onSubmit={handleRegistration}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>


                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div className="mb-4">
                        <label
                            htmlFor="photoURL"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Photo URL
                        </label>
                        <input
                            type="text"
                            id="photoURL"
                            name="photoURL"
                            placeholder="Enter your photo URL"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Password with Toggle */}
                    <div className="mb-4 relative">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-[55px] right-3 transform -translate-y-2/4 text-gray-500 focus:outline-none"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                        {/* Show password validation error */}
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button type="submit" className="btn btn-primary w-full mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        Register
                    </button>
                </form>

                {/* Social Login */}
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <button
                    className="btn btn-outline w-full flex items-center justify-center space-x-2"
                    type="button"
                    onClick={handleGoogleLogin}
                >
                    <FaGoogle className="text-lg" />
                    <span>Register with Google</span>
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login
                    </a>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}
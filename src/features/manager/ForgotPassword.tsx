import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
// import { useResetFlow } from "./../../context/ResetFlowContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { setUserEmail, setOtp } = useResetFlow();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3005/manager/forgot-password",
        {
          email,
        }
      );

      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem("forgotPasswordToken", response.data.token);
      }

      setSubmitted(true);
      // navigate("/reset-password");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white px-4"
      data-aos="fade-up"
    >
      <div className="w-full max-w-sm p-6 rounded-xl shadow-md border border-gray-100 bg-white">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
            <span className="text-2xl">🔐</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
          Forgot your password?
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          A code will be sent to your email to help reset your password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="block mx-auto mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-400 transition duration-200 cursor-pointer"
          >
            Reset password
          </button>
        </form>

        {/* Back to login */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-orange-500 hover:underline font-medium focus:outline-none cursor-pointer"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
}

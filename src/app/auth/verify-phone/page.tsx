"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../../images/logo.svg";
import lockImg from "../../../images/1.png";
import { useRouter } from "next/navigation";

export default function PhoneAuth() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formattedPhone = phone.trim().replace(/\D/g, ""); // remove non-digits

    // Must be 11 digits and start with "0"
    if (formattedPhone.length === 11 && formattedPhone[0] === "0") {
      formattedPhone = "+234" + formattedPhone.slice(1);
    } else {
      setMessage("Enter a valid Nigerian phone number (e.g., 08123456789).");
      setIsError(true);
      return;
    }

    try {
      const csrfToken = getCookie("csrftoken");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/verify-phone`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRFToken": csrfToken || "",
          },
          body: JSON.stringify({ phone_number: formattedPhone }),
        }
      );

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        setMessage(
          data.message ||
            "OTP sent successfully, check your messages for verification"
        );
        setIsError(false);

        sessionStorage.setItem("phone_number", formattedPhone);
        router.push("/auth/verify-otp");
      } else {
        setMessage(data.error || data.message || "Something went wrong.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error. Please try again later.");
      setIsError(true);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-gradient-to-br from-blue-50 via-blue-25 to-white relative">
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Left side - Logo and Illustration */}
        <div className="lg:flex-1 flex flex-col items-center justify-center p-8 lg:p-12">
          {/* Logo */}
          <div className="absolute top-8 left-8">
            <div className="flex items-center">
              <Image src={logo} alt="logo"></Image>
            </div>
          </div>

          {/* Security Illustration */}
          <div className="relative mt-16 lg:mt-0">
            <Image src={lockImg} alt="lockImg"></Image>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="lg:flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-[Inter-Medium] text-gray-900 mb-4 leading-tight">
                Enter Your Phone Number
              </h1>
              <p className="text-gray-600 text-lg font-[Inter-Regular]">
                We'll send you an OTP to verify your number
              </p>
            </div>

            <div className="space-y-6">
              {/* Country code and phone input */}
              <div className="flex">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-4 shadow-sm">
                  <span className="text-lg font-medium text-gray-700">
                    +234
                  </span>
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm 
                             focus:outline-none focus:border-blue-500 text-lg bg-white
                             transition-colors duration-200"
                  maxLength={11}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 
             text-white py-4 rounded-xl font-semibold text-lg 
             transition-all duration-200 shadow-lg hover:shadow-xl
             flex items-center justify-center space-x-2 relative"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291
             A7.962 7.962 0 014 12H0c0 3.042 
             1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="ml-2">Sending...</span>
                  </>
                ) : (
                  <span>Send OTP</span>
                )}
              </button>
            </div>

            {/* Feedback message */}
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                  isError
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

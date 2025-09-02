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
            "Accept": "application/json",
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
    <div className="min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-br from-blue-50 to-white px-6 py-8">
      {/* Logo */}
      <div className="mb-8 flex justify-center lg:justify-start">
        <Image src={logo} alt="SendNow Logo" className="w-[215px] h-[90px]" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-20">
          {/* Illustration */}
          <div className="flex justify-center lg:flex-1">
            <Image
              src={lockImg}
              alt="Secure Login"
              width={500}
              height={400}
              className="object-contain max-w-full h-auto"
              priority
            />
          </div>

          {/* Form */}
          <div className="lg:flex-1 w-full max-w-md">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Enter Your Phone Number
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {`We'll send you an OTP to verify your number`}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="tel"
                placeholder="e.g. 08123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm 
                           focus:outline-none focus:border-[#18B1FF] text-lg"
                required
                maxLength={11}
              />

              <button
                type="submit"
                className="w-full bg-[#18B1FF] hover:bg-[#1299E6] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md"
              >
                Send OTP
              </button>
            </form>

            {/* Feedback message */}
            {message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  isError ? "text-red-500" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

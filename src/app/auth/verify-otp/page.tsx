"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../../images/logo-white.png"; 
import illustration from "../../../images/illustration.png"; // replace with your image

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        (nextInput as HTMLInputElement)?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("Entered OTP:", code);
    // TODO: call API to verify OTP
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around bg-blue-50 px-6 py-8">
      {/* Left Illustration */}
      <div className="lg:flex-1 flex order-2 lg:order-1">
        <Image
          src={illustration}
          alt="Verify OTP Illustration"
          width={400}
          height={400}
          className="object-contain"
          priority
        />
      </div>

      {/* Right Section */}
      <div className="lg:flex-1 max-w-lg w-full order-1 lg:order-2">

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Verify OTP</h2>
          <p className="text-gray-600 mb-6">
            A 6-digit code was sent to <span className="font-medium">+234 80xx xxxx xx</span>
          </p>
          <p className="text-gray-500 mb-6">
            Didn&apos;t get it?{" "}
            <button className="text-blue-500 hover:underline font-medium">
              Resend Code
            </button>{" "}
            in 30Secs
          </p>

          {/* OTP Input Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center border-2 border-gray-200 rounded-lg text-xl font-semibold focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../../images/logo-white.png"; 
import lockImg from "../../../images/1.png"; 

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Phone number submitted:", phone);
    // TODO: Call your API to send OTP
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6 py-8">
        <div className="mb-12 flex lg:justify-start">
            <div className="flex gap-2">
              <Image src={logo} alt="SendNow Logo" width={32} height={32} />
            </div>
          </div>
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
        
        {/* Left Illustration */}
        <div className="flex justify-center lg:flex-1 order-2 lg:order-1">
          <div className="relative">
            <Image
              src={lockImg}
              alt="Secure Login"
              width={500}
              height={400}
              className="object-contain max-w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:flex-1 w-full max-w-md order-1 lg:order-2">
          

          {/* Form */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Enter Your Phone<br />Number
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              We'll send you an OTP to verify your number
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:border-gray-300 focus-within:border-[#18B1FF] transition-colors">
                <span className="px-4 py-4 text-gray-700 border-r border-gray-200 font-medium bg-gray-50">
                  +234
                </span>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-4 focus:outline-none text-gray-800 text-lg placeholder-gray-400"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#18B1FF] hover:bg-[#1299E6] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Send OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
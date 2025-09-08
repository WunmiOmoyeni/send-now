"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../images/logo.svg";

export default function VerifyDetails() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save values to sessionStorage
    sessionStorage.setItem("userName", name);
    sessionStorage.setItem("userDescription", description);

    // Redirect to OTP page
    router.push("/auth/verify-otp");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="absolute top-8 left-[60px]">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            className="w-24 h-auto sm:w-32 md:w-40 lg:w-[180px]" // adjust per screen size
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[300px] lg:w-[360px] max-w-md h-[500px]">
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="lg:w-[300px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="lg:w-[300px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full lg:w-[300px] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

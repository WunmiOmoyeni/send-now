"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../images/logo.svg";

export default function VerifyDetails() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save values to sessionStorage
    sessionStorage.setItem("userName", name);
    sessionStorage.setItem("userDescription", description);

    if (profilePic) {
      const reader = new FileReader();
      reader.onload = () => {
        sessionStorage.setItem("userProfilePic", reader.result as string);
        router.push("/auth/verify-otp");
      };
      reader.readAsDataURL(profilePic); // store as base64
    } else {
      router.push("/auth/verify-otp");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="absolute top-8 left-[60px]">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            className="w-24 h-auto sm:w-32 md:w-40 lg:w-[180px]"
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[300px] lg:w-[360px] max-w-md h-auto">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-12 h-12 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            )}
          </div>
          <label className="mt-3 text-sm text-blue-600 cursor-pointer font-[Inter-Regular]">
            Upload Profile Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-[Inter-Regular]">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="lg:w-[300px] border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 font-[Inter-Regular]"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-[Inter-Regular]">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="lg:w-[300px] border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 font-[Inter-Regular]"
            />
          </div>

          <button
            type="submit"
            className="w-full lg:w-[300px] bg-blue-500 hover:bg-blue-600 
                       text-white py-3 rounded-lg transition-all font-[Inter-Regular]"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

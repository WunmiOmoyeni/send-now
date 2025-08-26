"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../../images/logo.svg"
import lockImg from "../../../images/1.png";
import { useRouter } from "next/navigation";

export default function PhoneAuth() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formattedPhone = phone.trim().replace(/\D/g, ""); // remove non-digits

    // Case 1: User entered 10 digits (e.g. 8028336599) → add leading 0
    if (formattedPhone.length === 10 && formattedPhone[0] !== "0") {
      formattedPhone = "0" + formattedPhone;
    }

    // Case 2: User entered 11 digits and it starts with 0 → leave as is
    // Case 3: User entered intl format starting with 234 → convert to 0XXXXXXXXXX
    if (formattedPhone.startsWith("234") && formattedPhone.length === 13) {
      formattedPhone = "0" + formattedPhone.slice(3);
    }

    // Validate
    const phoneRegex = /^0\d{10}$/;
    if (!phoneRegex.test(formattedPhone)) {
      setMessage("Enter a valid Phone number.");
      return;
    }

    try {
      // Call your backend API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/verify-phone`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone_number: formattedPhone }),
        }
      );

      const data = await res.json(); // <-- parse backend response

      if (res.ok) {
        // 2xx
        setMessage(
          data.message ||
            "OTP sent successfully, check your messages for verification"
        );

        //saves phone number in session storage
        sessionStorage.setItem("phone_number", formattedPhone);

        //redirect to otp verification page
        router.push('/auth/verify-otp')
      } else {
        // Non-2xx (400, 401, 500, etc.)
        setMessage(data.error || data.message || "Something went wrong.");
        console.error("Backend error:", data); // <-- see exact backend error in console
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error. Please try again later.");
    }
  };

return (
  <div className="min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-br from-blue-50 to-white lg:from-blue-50 lg:to-white px-6 py-8">
    {/* Logo - Top left on desktop, centered with white bg on mobile */}
    <div className="mb-8 flex justify-center lg:justify-start">
      <div className="flex gap-2 bg-white w-full lg:bg-transparent rounded-lg lg:rounded-none shadow-sm lg:shadow-none">
        <Image src={logo} alt="SendNow Logo" className="w-[215px] h-[90px]"  />
      </div>
    </div>

    {/* Main Content - Centered on desktop */}
    <div className="flex-1 flex ">
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-16 lg:gap-20">
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
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Enter Your Phone
              <br />
              Number
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {`We'll send you an OTP to verify your number`}
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

            {/* Show response message */}
            {message && (
              <p className="mt-4 text-center text-sm font-medium text-red-500">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import illustration from "../../../images/illustration.png";
import logo from "../../../images/logo.svg";

export default function VerifyOtp() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const phone = sessionStorage.getItem("phone_number");

    if (!phone) {
      router.replace("/auth/verify-phone");
    }
  }, [router]);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift();
  }

  //Retrieve phone number from session storage
  const phone_number =
    typeof window != "undefined" ? sessionStorage.getItem("phone_number") : "";

  const maskedPhone =
    phone_number?.slice(0, 4) + "****" + phone_number?.slice(-3) || "";

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const csrfToken = getCookie("csrftoken");
      const verifyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
          },
          body: JSON.stringify({
            code: code.join(""),
            phone_number,
          }),
        }
      );

      if (!verifyResponse.ok) {
        throw new Error("Invalid OTP. Please try again.");
      }

      const verifyData = await verifyResponse.json();

      if (!verifyData.tokens) {
        throw new Error("No tokens received. Try again.");
      }

      const refreshToken = verifyData.tokens.refresh_token;
      const accessToken = verifyData.tokens.access_token;

      if (!refreshToken || !accessToken) {
        throw new Error("Tokens missing. Please try again");
      }

      //Save tokens immediately
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("refresh_token", refreshToken);
 
      setSuccessMessage("OTP verified successfully");

      router.push("/user-details")

   
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendLoading) return;

    setResendLoading(true);
    setSuccessMessage("");
    setError("");

    try {
      const csrfToken = getCookie("csrftoken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/resend-otp`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
          },
          body: JSON.stringify({
            phone_number: phone_number,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage("Code sent again");
      setCode(Array(6).fill("")); // Clear existing code
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };




  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-blue-50 px-6 py-8">
      {/* Logo */}
      <div className="absolute top-8 left-[60px]">
        <Image
          src={logo}
          alt="logo"
          className="w-24 h-auto sm:w-32 md:w-40 lg:w-[180px]"
        />
      </div>

      {/* Centered Content Wrapper */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full">
        {/* Illustration */}
        <div className="flex justify-center">
          <Image
            src={illustration}
            alt="Verify OTP Illustration"
            width={500}
            height={350}
            className="object-contain"
            priority
          />
        </div>

        {/* Verification Form */}
        <div className="max-w-md w-full p-8">
          <h2 className="text-[50px] font-medium font-[Inter-Regular] text-gray-900 mb-4">Verify OTP</h2>
          <p className="text-gray-600 mb-6 font-[Inter-Regular]">
            A 6-digit code was sent to{" "}
            <span className="font-medium">{maskedPhone}</span>
          </p>
          <p className="text-gray-500 mb-6 font-[Inter-Regular]">
            Didn&apos;t get it?{" "}
            <button
              onClick={handleResendOtp}
              className={
                "font-medium underline text-blue-500 hover:text-blue-600 cursor-pointer"
              }
            >
              {resendLoading ? "Sending..." : "Resend Code"}
            </button>{" "}
            {successMessage && (
              <p className="mt-2 text-sm text-green-500">{successMessage}</p>
            )}
             {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          </p>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center border-2 border-gray-200 rounded-lg text-xl font-semibold focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>

            {/*Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || code.some((digit) => !digit)}
              className="w-[300px] bg-blue-500 hover:bg-blue-600 font-[Inter-Regular] text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

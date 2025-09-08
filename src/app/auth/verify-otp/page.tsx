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
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  //Timer effect for resend functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift();
  }

  //Retrieve phone number from session storage
  const phone_number =
    typeof window != "undefined" ? sessionStorage.getItem("phone_number") : "";

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const csrfToken = getCookie("csrftoken");
      const response = await fetch(
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

      if (!response.ok) {
        throw new Error("Invalid OTP. Please try again.");
      }

      const data = await response.json();

      //Save access + refresh token to session storage
      sessionStorage.setItem("access_token", data.access);
      sessionStorage.setItem("refresh_token", data.refresh);

      router.push("/chat-page");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || resendLoading) return;

    setResendLoading(true);
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
            phone_number,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resend OTP. Please try again.");
      }

      // Reset timer and disable resend button
      setResendTimer(30);
      setCanResend(false);
      setCode(Array(6).fill("")); // Clear existing code

    } catch (error) {
      setError (error instanceof Error ? error.message : "Failed to resend OTP");
    } finally {
      setResendLoading (false);
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Verify OTP</h2>
          <p className="text-gray-600 mb-6">
            A 6-digit code was sent to{" "}
            <span className="font-medium">+234 80xx xxxx xx</span>
          </p>
          <p className="text-gray-500 mb-6">
            Didn&apos;t get it?{" "}
            <button 
            onClick={handleResendOtp}
            disabled={!canResend || resendLoading}
            className={`font-medium underline ${
                canResend && !resendLoading
                  ? "text-blue-500 hover:text-blue-600 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}>
             {resendLoading ? "Sending..." : "Resend Code"}
            </button>{" "}
            {!canResend && resendTimer > 0 && `in ${resendTimer}s`}
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
              className="w-[300px] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

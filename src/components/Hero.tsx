"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import heroImage from "../images/Group 6.png";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const targetText = "SendNow";
  const typingSpeed = 150;

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setDisplayedText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-16 lg:py-24 max-w-[1400px] mx-auto">
      {/* Left Content - 3/4 width */}
      <div className="lg:w-[670px]">
        <h1 className="text-[60px] leading-[-0.04] font-[Helvetica-Regular] font-semibold">
          Introducing{" "}
          <span className="text-[#18B1FF]">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>{" "}
          Chat - Instant, Secure, Smarter Messaging
        </h1>

        <div className="lg:w-[638px]">
          <p className="mt-[20px] text-gray-600 text-[25px] leading-[1.2] max-w-3xl font-[Helvetica-Regular]">
            Real-time conversations, media sharing, and smart features to keep
            communication smooth and intuitive.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-[50px] w-[545px]">
          <button className="w-full bg-[#18B1FF] hover:bg-[#0FA0E6] text-white px-8 py-4 rounded-[60px] font-[Helvetica-Regular] text-lg transition-colors duration-200">
            Download
          </button>
          <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-[60px] font-[Helvetica-Regular] text-lg transition-all duration-200">
            Get Started
          </button>
        </div>
      </div>

      {/* Right Content - 1/4 width */}
      <div className="lg:w-1/4 mt-12 lg:mt-0 relative">
        <div className="relative">
          {/* Main hero image/person */}
          <div className="bg-[#18B1FF] pt-[-200px] rounded-tl-[100px] rounded-tr-lg rounded-br-lg rounded-bl-lg  shadow-2xl inline-block">
            <Image
              src={heroImage}
              alt="Person using secure messaging"
              width={300}
              height={700}
              className="rounded-2xl w-full"
              priority
            />
          </div>

          {/* Floating UI elements */}
          <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-4 rounded-2xl shadow-lg animate-bounce z-20">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-green-500 text-white p-3 rounded-xl shadow-lg animate-pulse z-20">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="absolute top-1/2 -left-8 bg-yellow-400 text-white p-3 rounded-full shadow-lg animate-ping z-20">
            <span className="text-sm font-bold">💬</span>
          </div>

          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-3xl -m-8 z-0"></div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import heroImage from "../images/Group 6.png";
import floatImageOne from "../images/chat icon.png";
import floatImageTwo from "../images/material-symbols_star.png";

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
    <section className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-24 max-w-[1400px] mx-auto">
      {/* Left Content */}
      <div className="w-full lg:max-w-[670px] lg:text-left font-[Inter-Regular]">
        <h1 className="text-3xl sm:text-4xl lg:text-[60px] leading-tight font-[Inter-Semibold]">
          Introducing{" "}
          <span className="text-[#18B1FF]">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>{" "}
          Chat - Instant, Secure, Smarter Messaging
        </h1>

        <p className="mt-5 text-gray-600 text-lg sm:text-xl lg:text-[25px] leading-snug max-w-2xl mx-auto lg:mx-0">
          Real-time conversations, media sharing, and smart features to keep
          communication smooth and intuitive.
        </p>

        <div className="flex flex-row gap-4 mt-10 w-full sm:w-auto max-w-[545px] mx-auto lg:mx-0">
          <button className="flex-1 bg-[#18B1FF] hover:bg-[#0FA0E6] text-white px-8 py-4 rounded-[60px] text-lg transition-colors duration-200">
            Download
          </button>
          <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-[60px] text-lg transition-all duration-200">
            Get Started
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mt-10 lg:mt-0">
        <div className="relative">
          {/* Main hero image container */}
          <div className="-pb-[30px] bg-[#18B1FF] rounded-tl-[120px] sm:rounded-tl-[160px] rounded-tr-[40px] rounded-br-[40px] rounded-bl-[30px] shadow-2xl inline-block max-w-[400px] sm:max-w-[490px] h-[450px] lg:h-[470px]">
            <Image
              src={heroImage}
              alt="Person using secure messaging"
              width={300}
              height={700}
              className="rounded-2xl w-full object-cover transform -translate-y-8 sm:-translate-y-12 -translate-x-6 sm:-translate-x-8"
              priority
            />
          </div>

          {/* Floating UI elements */}
          {/* <div className="absolute top-0 right-0 z-20">
            <Image
              src={floatImageTwo}
              alt="Floating decoration"
              width={40}
              height={24}
              className="object-contain"
            />
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

          <div className="absolute -top-4 sm:-top-2 -left-16 sm:-left-24 z-10">
            <Image
              src={floatImageOne}
              alt="Floating decoration"
              width={60}
              height={60}
              className="object-contain sm:w-[80px] sm:h-[60px]"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}

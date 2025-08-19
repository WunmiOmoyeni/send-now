// components/FeaturesExtra.tsx
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import testedImage from "../images/rafiki.png";
import secure from "../images/Group 7.png";

export default function FeaturesExtra() {
  return (
    <div>
      {/* Tested, Verified, Ready */}
      <section className="py-16">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start lg:space-x-10">
          {/* Left side */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="mb-8 font-[Inter-Medium] text-3xl sm:text-4xl md:text-5xl lg:text-[65px] leading-tight">
              Tested. Verified. Ready.
            </h2>

            <ul className="space-y-6 sm:space-y-8 font-[Inter-Medium] text-lg sm:text-xl md:text-2xl lg:text-[30px] max-w-2xl mx-auto lg:mx-0">
              {[
                "Real-time delivery confirmed",
                "Edited messages marked clearly",
                "Emoji support functional",
                "Media & file sharing tested",
                "User profiles display accurate info",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start lg:items-center gap-4 sm:gap-5 lg:gap-6"
                >
                  <span className="flex-shrink-0 p-2 sm:p-2.5 lg:p-3 rounded-full bg-[#18B1FF] text-white flex items-center justify-center mt-0.5 lg:mt-0">
                    <Check
                      size={20}
                      className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px]"
                    />
                  </span>
                  <span className="leading-relaxed text-left">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side */}
          <div className="mt-12 lg:mt-0 flex justify-center flex-1 w-full">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
              <Image
                src={testedImage}
                alt="Tested & Verified"
                className="rounded-lg w-full h-auto lg:w-[890px] lg:h-[665px] "
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Secure, Scalable & Lightning Fast */}
      <section className="py-16">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center lg:items-start lg:space-x-10">
          {/* Image */}
          <div className="flex justify-center mb-10 lg:mb-0 lg:flex-1">
            <Image
              src={secure}
              alt="Secure Messaging"
              className="rounded-lg max-w-[300px] sm:max-w-[400px] lg:max-w-[605px] h-auto"
            />
          </div>

          {/* Text */}
          <div className="lg:flex-1 text-left">
            <h2 className="text-[28px] sm:text-[40px] lg:text-[70px] font-[Inter-Medium] mb-[50px] leading-tight ">
              <span className="text-blue-500">Secure</span>, Scalable &amp;
              Lightning Fast
            </h2>
            <ul className="space-y-6 ">
              <li className="text-[18px] sm:text-[22px] lg:text-[35px] font-[Inter-Medium] max-w-[500px] mx-auto lg:mx-0">
                <strong>End-to-End Encryption</strong>
                <br />
                <span className="text-[#797979] font-[Inter-Regular] text-[16px] sm:text-[18px] lg:text-[20px]">
                  Messages are safe in transit and at rest.
                </span>
              </li>
              <li className="text-[18px] sm:text-[22px] lg:text-[35px] font-[Inter-Medium] max-w-[500px] mx-auto lg:mx-0">
                <strong>High Performance</strong>
                <br />
                <span className="text-[#797979] font-[Inter-Regular] text-[16px] sm:text-[18px] lg:text-[20px]">
                  Built to handle thousands of users in real time.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import imgRealTime from "../images/Rectangle 13.png";
import imgEditDelete from "../images/Frame 1171276349.png";
import imgTools from "../images/Frame 1171276352.png";
import imgEmoji from "../images/Frame 1171276349 (1).png";

const features = [
  {
    title: "Real-time Messaging",
    description: "Send and receive messages instantly – always in sync.",
    image: imgRealTime,
  },
  {
    title: "Edit & Delete Messages",
    description:
      "Mistakes? No problem. Edit or delete messages, with history preserved.",
    image: imgEditDelete,
  },
  {
    title: "Message Tools",
    description:
      "Reply, copy, forward, star, pin, and share messages with ease.",
    image: imgTools,
  },
  {
    title: "Emoji Support",
    description: "Express yourself with full emoji support.",
    image: imgEmoji,
  },
];

export default function FeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState(new Set<number>());
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleFeatures((prev) => new Set(prev).add(index));
            }, 100);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <section 
      className="px-4 sm:px-8 lg:px-16 py-16 max-w-[1200px] lg:mx-auto overflow-hidden mx-[20px] rounded-[30px] relative"
      style={{
        background: `
          linear-gradient(135deg, transparent 0%, transparent 60%, rgba(255, 255, 255, 0.9) 100%),
          linear-gradient(to bottom right, rgba(219, 234, 254, 0.8) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(255, 255, 255, 1) 100%)
        `
      }}
    >
      {/* Gradient overlay for top-left fade */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[30px]"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at top left, 
              rgba(219, 234, 254, 0.3) 0%, 
              rgba(219, 234, 254, 0.1) 30%, 
              transparent 60%
            )
          `
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 font-[Inter-Regular] px-4">
          <h2 className="text-[28px] sm:text-[40px] lg:text-[70px] font-semibold text-[#171717] leading-tight">
            Packed with Powerful <br />
            <span className="text-[28px] sm:text-[40px] lg:text-[70px] font-semibold text-[#18B1FF]">
              Features
            </span>
          </h2>
        </div>

        {/* Features List */}
        <div className="space-y-20">
          {features.map((feature, idx) => {
            const isVisible = visibleFeatures.has(idx);
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                ref={(el) => {
                  featureRefs.current[idx] = el;
                }}
                className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 min-h-[320px] relative"
              >
                {/* Image */}
                <div
                  className={`flex-1 flex justify-center transition-all duration-[2000ms] ease-out relative w-full ${
                    isVisible
                      ? isEven
                        ? "lg:order-1 opacity-100 translate-x-0"
                        : "lg:order-2 opacity-100 translate-x-0"
                      : isEven
                      ? "lg:order-2 lg:translate-x-full opacity-0 translate-y-4"
                      : "lg:order-1 lg:-translate-x-full opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: isVisible ? "0ms" : "0ms",
                    zIndex: isVisible ? 2 : 1,
                  }}
                >
                  <div className="relative w-full max-w-[525px] aspect-[525/400] sm:aspect-[525/430] lg:aspect-[525/465] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-100">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 525px"
                      priority={idx < 2}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`w-full lg:w-1/2 flex-1 text-center lg:text-left transition-all duration-[2000ms] ease-out relative ${
                    isVisible
                      ? isEven
                        ? "lg:order-2 opacity-100 translate-x-0"
                        : "lg:order-1 opacity-100 translate-x-0"
                      : isEven
                      ? "lg:order-1 lg:-translate-x-full opacity-0 translate-y-4"
                      : "lg:order-2 lg:translate-x-full opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: isVisible ? "600ms" : "0ms",
                    zIndex: isVisible ? 2 : 1,
                  }}
                >
                  <div className="w-full max-w-[376px] mx-auto lg:mx-0 flex flex-col justify-center space-y-4">
                    <h3 className="text-[22px] sm:text-[28px] lg:text-[40px] font-[Inter-Medium] text-gray-800 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
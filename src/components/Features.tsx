"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Example images — replace with yours
import imgRealTime from "../images/Rectangle 13.png";
import imgEditDelete from "../images/Frame 1171276349.png";
import imgTools from "../images/Frame 1171276352.png";
import imgEmoji from "../images/Frame 1171276349 (1).png";

const features = [
  {
    title: "Real-time Messaging",
    description: "Send messages instantly — everywhere.",
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
    description:
      "Express yourself with full emoji support.",
    image: imgEmoji,
  },
];

export default function FeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState(new Set());
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Add delay before starting animation to hide initial positioning
            setTimeout(() => {
              setVisibleFeatures(prev => new Set(prev).add(index));
            }, 100);
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section className="px-4 sm:px-8 lg:px-16 py-16 max-w-[1200px] mx-auto overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
          Packed with Powerful
        </h2>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18B1FF] mt-2">
          Features
        </h2>
      </div>

      {/* Features List - Crossover Animation Layout */}
      <div className="space-y-20">
        {features.map((feature, idx) => {
          const isVisible = visibleFeatures.has(idx);
          const isEven = idx % 2 === 0;
          
          return (
            <div
              key={idx}
              ref={el => { featureRefs.current[idx] = el; }}
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[320px] relative"
            >
              {/* Image Container */}
              <div 
                className={`flex-1 w-full max-w-md lg:max-w-none transition-all duration-[2500ms] ease-out relative ${
                  isVisible 
                    ? isEven 
                      ? 'lg:order-1 opacity-100' // Final position for even items
                      : 'lg:order-2 opacity-100' // Final position for odd items
                    : isEven 
                      ? 'lg:order-2 lg:translate-x-full opacity-0' // Start from right for even items
                      : 'lg:order-1 lg:-translate-x-full opacity-0' // Start from left for odd items
                }`}
                style={{ 
                  transitionDelay: isVisible ? '0ms' : '0ms',
                  zIndex: isVisible ? 2 : 1,
                  visibility: isVisible || visibleFeatures.size > 0 ? 'visible' : 'hidden'
                }}
              >
                <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div 
                className={`flex-1 text-center lg:text-left space-y-4 transition-all duration-[2500ms] ease-out relative ${
                  isVisible 
                    ? isEven 
                      ? 'lg:order-2 opacity-100' // Final position for even items
                      : 'lg:order-1 opacity-100' // Final position for odd items  
                    : isEven 
                      ? 'lg:order-1 lg:-translate-x-full opacity-0' // Start from left for even items
                      : 'lg:order-2 lg:translate-x-full opacity-0' // Start from right for odd items
                }`}
                style={{ 
                  transitionDelay: isVisible ? '600ms' : '0ms',
                  zIndex: isVisible ? 2 : 1,
                  visibility: isVisible || visibleFeatures.size > 0 ? 'visible' : 'hidden'
                }}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
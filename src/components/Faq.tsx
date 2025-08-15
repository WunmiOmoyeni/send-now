"use client";
import { useState } from "react";

export default function Faq() {
  const faqs = [
    {
      question: "How does SendNow work?",
      answer:
        "SendNow allows you to send files instantly and securely without the need for sign-up. Just upload, share the link, and you're done.",
    },
    {
      question: "Is SendNow free to use?",
      answer:
        "Yes! SendNow offers a free plan with generous limits. We also have premium options for advanced features.",
    },
    {
      question: "How secure are my files?",
      answer:
        "All files are encrypted during transfer and deleted after the set expiration time you choose.",
    },
    {
      question: "Can I send large files?",
      answer:
        "Yes, depending on your plan. Premium users can send significantly larger files than free users.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold">
          General <span className="text-[#18B1FF]">FAQs</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-[Helvetica-Regular]">
          Everything you need to know about SendNow and how it works. Can’t find
          an answer?{" "}
          <span className="text-[#18B1FF]">Send a Chat to our team</span>
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4 mb-24 w-full max-w-4xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 bg-[#0368FF1A] rounded-lg py-5 px-4 cursor-pointer hover:shadow-sm transition"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-sm sm:text-base lg:text-lg">{faq.question}</h2>
              <span className="text-xl sm:text-2xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

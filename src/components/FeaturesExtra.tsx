// components/FeaturesExtra.tsx
import React from "react";
import Image from "next/image";
import testedImage from "../images/rafiki.png";
import secure from "../images/9.png";

export default function FeaturesExtra() {
  return (
    <div>
      {/* Tested, Verified, Ready */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center flex">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Tested. Verified. Ready.
            </h2>
            <ul className="space-y-3 text-gray-600 text-lg">
              <li> Real-time delivery confirmed</li>
              <li> Edited messages marked clearly</li>
              <li> Emoji support functional</li>
              <li> Media &amp; file sharing tested</li>
              <li> User profiles display accurate info</li>
            </ul>
          </div>

          <div className="mt-10 flex justify-center">
            <Image
              src={testedImage}
              alt="Tested & Verified"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Secure, Scalable & Lightning Fast */}
      <section className=" py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-blue-500">Secure</span>, Scalable &amp;
              Lightning Fast
            </h2>
            <ul className="space-y-4 text-gray-600 text-lg">
              <li>
                <strong>End-to-End Encryption</strong> – Messages are safe in
                transit and at rest.
              </li>
              <li>
                <strong>High Performance</strong> – Built to handle thousands of
                users in real time.
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src={secure}
              alt="Secure Messaging"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

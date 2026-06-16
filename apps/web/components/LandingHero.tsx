import React from "react";
import Image from "next/image";
import { Heading } from "@/components";
import landing_bgImage from "@/public/landing_bgImage.jpg";

export const LandingHero = () => {
  return (
    <div className="relative -z-10 bg-surface/10 -mt-24 mb-40 flex flex-col items-center justify-center min-h-120">
      {/* Background Image Container */}
      <div className="absolute inset-y-0 -z-10 py-36 h-150 w-screen overflow-hidden pointer-events-none">
        <Image
          className="absolute inset-0 -z-10 object-cover"
          src={landing_bgImage}
          alt="Background"
          fill
          priority
          quality={95}
          sizes="100vw"
        />

        {/* Top-to-Bottom Gradient Overlay to fade into the page background color */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-60% to-background pointer-events-none" />

        {/* Hero Title and Subtitle */}
        <div className="p-20 max-w-6xl mx-auto flex flex-col gap-4">
          <Heading variant="lg" className="text-white sm:text-6xl">
            {`Find and connect with all the stars in your orbit.`}
          </Heading>
          <Heading className="text-primary-alt font-medium">
            {`Discover, connect, and explore our community. Network with professionals from all over the globe.`}
          </Heading>
        </div>
      </div>
    </div>
  );
};

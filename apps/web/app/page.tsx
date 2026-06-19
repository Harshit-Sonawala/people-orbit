"use client";
import Image from "next/image";
import {
  LandingHero,
  DashboardCardsRows,
  DashboardCharts,
  Card,
  Heading,
} from "@/components";

import landingCardImg1 from "@/public/landing_card_image1.jpg";
import landingCardImg2 from "@/public/landing_card_image2.jpg";
import landingCardImg3 from "@/public/landing_card_image3.jpg";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Landing Section */}
      <LandingHero />

      <div className="flex flex-col flex-1 items-stretch justify-center gap-8 w-[90%] lg:w-[80%] mx-auto pb-32">
        {/* Marketing Material Landing Page Cards */}
        <div className="flex flex-row items-stretch justify-evenly gap-8">
          {/* Card 1: Connect with like-minded professionals */}
          <Card className="relative w-full flex-1 hover:flex-2 h-100 justify-center p-0 transition-all duration-300">
            <Image
              src={landingCardImg1}
              alt="Connect with like-minded professionals"
              fill
              sizes="(max-width: 1280px)"
              className="object-cover rounded-lg opacity-80"
              priority
            />
            <div className="absolute flex flex-col flex-1 gap-4 items-stretch justify-center p-12">
              <Heading variant="lg" className="text-white">
                Connect with Professionals
              </Heading>
              <p className="text-white">
                Grow your network by engaging with like-minded experts, peers,
                and mentors.
              </p>
            </div>
          </Card>

          {/* Card 2: Browse through job postings and share your interest */}
          <Card className="relative w-full flex-1 hover:flex-2 h-100 justify-center p-0 transition-all duration-300">
            <Image
              src={landingCardImg2}
              alt="Connect with like-minded professionals"
              fill
              sizes="(max-width: 1280px)"
              className="object-cover rounded-lg opacity-80"
              priority
            />
            <div className="absolute flex flex-col flex-1 gap-4 items-stretch justify-center p-12">
              <Heading variant="lg" className="text-white">
                Browse Job Postings
              </Heading>
              <p className="text-white">
                Express your interest directly to top companies and recruiters
                in your field.
              </p>
            </div>
          </Card>

          {/* Card 3: Create your profile and share with others */}
          <Card className="relative w-full flex-1 hover:flex-2 h-100 justify-center p-0 transition-all duration-300">
            <Image
              src={landingCardImg3}
              alt="Connect with like-minded professionals"
              fill
              sizes="(max-width: 1280px)"
              className="object-cover rounded-lg opacity-80"
              priority
            />
            <div className="absolute flex flex-col flex-1 gap-4 items-stretch justify-center p-12">
              <Heading variant="lg" className="text-white">
                Showcase your Profile
              </Heading>
              <p className="text-white">
                Build a professional portfolio and share it seamlessly with
                potential employers.
              </p>
            </div>
          </Card>
        </div>

        {/* Dashboard Fact Cards Row */}
        <DashboardCardsRows />

        {/* Visualizations */}
        <DashboardCharts />
      </div>
    </div>
  );
}

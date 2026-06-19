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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Connect with like-minded professionals */}
          <Card className="flex flex-col h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="relative w-full h-52 rounded-lg overflow-hidden shrink-0">
              <Image
                src={landingCardImg1}
                alt="Connect with like-minded professionals"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col">
              <Heading className="text-foreground">
                Connect with like-minded professionals
              </Heading>
              <p className="text-foreground-alt">
                Grow your network by engaging with industry experts, peers, and
                mentors who share your career vision and values.
              </p>
            </div>
          </Card>

          {/* Card 2: Browse through job postings and share your interest */}
          <Card className="flex flex-col h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="relative w-full h-52 rounded-lg overflow-hidden shrink-0">
              <Image
                src={landingCardImg2}
                alt="Browse through job postings and share your interest"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Heading className="text-foreground">
                Browse through job postings and share your interest
              </Heading>
              <p className="text-foreground-alt">
                Discover your next career move and express interest directly to
                top companies and recruiters hiring in your field.
              </p>
            </div>
          </Card>

          {/* Card 3: Create your profile and share with others */}
          <Card className="flex flex-col h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="relative w-full h-52 rounded-lg overflow-hidden shrink-0">
              <Image
                src={landingCardImg3}
                alt="Create your profile and share with others"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Heading className="text-foreground">
                Create your profile and share with others
              </Heading>
              <p className="text-foreground-alt">
                Build a professional digital presence that showcases your
                accomplishments, and share it seamlessly with potential
                employers.
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

import React from "react";
import { Card, Heading, Logo } from "@/components";
import { SatelliteAltRounded } from "@mui/icons-material";

export const Footer = () => {
  return (
    <Card className="flex flex-row items-center justify-between p-8 w-full rounded-none mt-8">
      <div className="flex flex-col gap-4 md:w-[90%] mx-auto">
        <Logo />
        <p>Find and gravitate to all the stars in your orbit.</p>
      </div>
    </Card>
    // Glow Background color asethetic styling:
    // <div className="relative bg-surface">
    //   <div className="w-100 h-100 bg-[#03abc9] rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

    //   <div className="relative z-10 p-6 flex flex-col h-full justify-between">
    //     <Heading variant="md" className="text-primary text-xl font-semibold">
    //       PeopleOrbit
    //     </Heading>
    //     <p className="text-sm">
    //       Find and gravitate to all the stars in your orbit.
    //     </p>
    //   </div>
    // </div>
  );
};

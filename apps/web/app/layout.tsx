import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

import { TopBar } from "@/components/TopBar";

export const metadata: Metadata = {
  title: "PeopleOrbit",
  description: "People Directory Web App",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col pb-48">
        <Providers>
          <TopBar />
          <div className="w-[90%] lg:w-[80%] mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Header, Footer } from "@/components";
import { cookies } from "next/headers";
import { getMeServer } from "@/utils/getMeServer";
import { Notification } from "@/components";

export const metadata: Metadata = {
  title: "PeopleOrbit",
  description: "People Directory Web App",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value ?? "";
  const user = accessToken ? await getMeServer(accessToken) : null;

  return (
    <html lang="en" className={`h-full antialiased`}>
      <Providers user={user}>
        <body className="min-h-full flex flex-col">
          <Header user={user} />
          {children}
          <Notification />
          <Footer />
        </body>
      </Providers>
    </html>
  );
}

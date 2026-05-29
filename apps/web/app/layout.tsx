import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { TopBar } from "@/components/TopBar";
import { cookies } from "next/headers";
import { getMe } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PeopleOrbit",
  description: "People Directory Web App",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let user = null;
  if (accessToken) {
    user = await getMe(accessToken);
  }

  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col pb-48">
        <Providers user={user}>
          <TopBar />
          <div className="w-[90%] lg:w-[80%] mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

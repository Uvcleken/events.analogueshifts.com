import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import { UserProvider } from "@/contexts/user";
import { ToastProvider } from "@/contexts/toast";
import ToastMessage from "@/components/application/toast";
import { EventsProvider } from "@/contexts/events";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Event Management Software | Analogue Shifts",
  description:
    "Simplify your event planning with our online event management software. Manage registrations, schedules, and communication all in one user-friendly platform.",
  openGraph: {
    title: "Online Event Management Software | Analogue Shifts",
    description:
      "Simplify your event planning with our online event management software. Manage registrations, schedules, and communication all in one user-friendly platform.",
    url: "https://events.analogueshifts.app",
    siteName: "AnalogueShifts Events Planner",
    images: [
      {
        url: "/a4.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://events.analogueshifts.app",
  },
  verification: {
    google: "wNT1hvWDYGZp2pbVAHsjrug-fDv3T_Z0uxTL_SWBOwc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G7NWPZKQ2S"
        ></Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`     window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-G7NWPZKQ2S');
                    `}
        </Script>
      </head>
      <body className={cn(plusJakartaSans.className)}>
        {" "}
        <UserProvider>
          <ToastProvider>
            <EventsProvider>
              <ToastMessage />
              {children}
            </EventsProvider>
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}

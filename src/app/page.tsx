import GuestLayout from "@/components/application/layouts/guest";
import Slider from "@/components/application/home/slider";
import ExploreEvents from "@/components/application/home/explore-events";
import DownloadApp from "@/components/application/home/download-app";
import { Metadata } from "next";
import Landing from "@/components/application/home/landing";
import Reviews from "@/components/application/home/reviews";
import FAQ from "@/components/application/home/faq";
import NewsLetter from "@/components/application/home/news-letter";

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

export default async function Home() {
  const events = await getEvents();

  return (
    <GuestLayout>
      <Landing />
      {events && events?.data?.events?.data[0] && (
        <Slider events={events?.data?.events?.data || []} />
      )}
      <ExploreEvents events={events?.data?.events?.data || []} />
      <DownloadApp />
      <Reviews />
      <FAQ />
      <NewsLetter />
    </GuestLayout>
  );
}

const getEvents = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/event`, {
      cache: "no-store",
    });

    const contentType = res.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Invalid response type");
    }

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(
        `Failed to fetch events: ${res.status} ${res.statusText}`
      );
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
};

"use client";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/contexts/user";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import AuthenticationNavigation from "@/components/application/authenticated-navigation";
import { useRouter, usePathname } from "next/navigation";
import LogoutConfirmation from "@/components/application/logout-confirmation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { getUser } = useAuth();
  const [idiomModalDisplay, setIdiomModalDisplay] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const authLink = process.env.NEXT_PUBLIC_AUTH_URL;
  const app = process.env.NEXT_PUBLIC_SITE_BUILD_UUID;

  const token = Cookies.get("analogueshifts");

  useEffect((): any => {
    // Redirect To Login if User is not Authenticated
    if (user === null && !token) {
      Cookies.set("RedirectionLink", pathname);
      router.push(`${authLink}?app=${app}`);
      return null;
    } else if (user === null && token) {
      //    Fetch User
      getUser({ setLoading: (value) => {}, layout: "authenticated", token });
    }
  }, []);

  return (
    <section className="w-full min-h-screen">
      <LogoutConfirmation
        close={() => setIdiomModalDisplay(false)}
        open={idiomModalDisplay}
      />
      <AuthenticationNavigation
        user={user}
        handleLogout={() => setIdiomModalDisplay(true)}
      />
      {/* <SidebarMenu handleLogout={() => setIdiomModalDisplay(true)} /> */}
      <div className="w-full  pt-16">{children}</div>
    </section>
  );
}

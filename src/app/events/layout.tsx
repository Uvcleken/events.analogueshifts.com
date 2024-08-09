"use client";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/contexts/user";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import SidebarMenu from "@/components/application/sidebar-menu";
import IdiomProof from "@/components/application/idiom-proof";
import Loading from "@/components/application/loading";
import AuthenticationNavigation from "@/components/application/authenticated-navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { getUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [idiomModalDisplay, setIdiomModalDisplay] = useState(false);

  const token = Cookies.get("analogueshifts");

  useEffect((): any => {
    // Redirect To Login if User is not Authenticated
    if (user === null && !token) {
      window.location.pathname = "/login";
      return null;
    } else if (user === null && token) {
      //    Fetch User
      getUser({ setLoading: (value) => {}, layout: "authenticated", token });
    }
  }, []);

  const handleLogout = () => {
    setIdiomModalDisplay(false);
    logout({ setLoading });
  };

  return (
    <section className="w-full min-h-screen">
      {loading && <Loading />}
      <IdiomProof
        action={handleLogout}
        close={() => setIdiomModalDisplay(false)}
        description="Are you sure you want to sign out of your account? You can always sign in at anytime."
        open={idiomModalDisplay}
        title="Confirm LogOut"
        label="Log Out"
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

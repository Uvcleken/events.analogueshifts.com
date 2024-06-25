"use client";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import GuestNavigation from "../guest-navigation";
import IdiomProof from "../idiom-proof";
import { logout } from "@/utils/logout";
import Loading from "../loading";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idiomModalDisplay, setIdiomModalDisplay] = useState(false);

  useEffect(() => {
    const authSession = Cookies.get("analogueshifts");
    if (authSession) {
      setUser(JSON.parse(authSession));
    }
  }, []);

  const handleLogout = () => {
    setIdiomModalDisplay(false);
    logout(setLoading, user);
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
      <GuestNavigation
        handleLogout={() => setIdiomModalDisplay(true)}
        user={user}
      />
      <div className="w-full pt-16">{children}</div>
    </section>
  );
}

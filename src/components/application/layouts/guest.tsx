"use client";
import { useUser } from "@/contexts/user";
import { useAuth } from "@/hooks/auth";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import GuestNavigation from "../guest-navigation";
import IdiomProof from "../idiom-proof";
import Loading from "../loading";
import SearchModal from "./search-modal";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { logout, getUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [idiomModalDisplay, setIdiomModalDisplay] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("analogueshifts");
    if (token) {
      getUser({ setLoading: (loading) => {}, layout: "guest", token });
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
      <GuestNavigation
        handleLogout={() => setIdiomModalDisplay(true)}
        user={user}
        showSearch={setShowSearchModal}
      />
      <SearchModal open={showSearchModal} setOpen={setShowSearchModal} />
      <div className="w-full pt-16">{children}</div>
    </section>
  );
}

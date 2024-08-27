"use client";
import { useUser } from "@/contexts/user";
import { useAuth } from "@/hooks/auth";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import GuestNavigation from "../guest-navigation";
import LogoutConfirmation from "../logout-confirmation";
import SearchModal from "./search-modal";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { getUser } = useAuth();
  const [idiomModalDisplay, setIdiomModalDisplay] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("analogueshifts");
    if (token) {
      getUser({ setLoading: (loading) => {}, layout: "guest", token });
    }
  }, []);

  return (
    <section className="w-full min-h-screen">
      <LogoutConfirmation
        close={() => setIdiomModalDisplay(false)}
        open={idiomModalDisplay}
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

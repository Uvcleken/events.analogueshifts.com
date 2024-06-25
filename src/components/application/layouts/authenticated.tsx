"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AuthenticationNavigation from "../authenticated-navigation";
import SidebarMenu from "../sidebar-menu";
import IdiomProof from "../idiom-proof";
import { logout } from "@/utils/logout";
import Loading from "../loading";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idiomModalDisplay, setIdiomModalDisplay] = useState(false);

  useEffect(() => {
    const authSession = Cookies.get("analogueshifts");
    if (!authSession) {
      router.push("/login");
    } else {
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
      <AuthenticationNavigation
        user={user}
        handleLogout={() => setIdiomModalDisplay(true)}
      />
      <SidebarMenu handleLogout={() => setIdiomModalDisplay(true)} />
      <div className="w-full pl-16 pt-16">{children}</div>
    </section>
  );
}

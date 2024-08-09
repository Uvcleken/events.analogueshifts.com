"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <Suspense fallback={<p></p>}></Suspense>;
}

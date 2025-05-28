"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      return router.push(`/p/${userId}/dashboard`);
    }
    router.push("/login");
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}

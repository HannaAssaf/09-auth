"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.refresh();
    setLoading(true);
  }, []);

  return <>{loading ? <div>Loading...</div> : children}</>;
}

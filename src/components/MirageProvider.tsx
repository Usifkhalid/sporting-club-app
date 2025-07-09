"use client";

import { useEffect } from "react";
import { makeServer } from "@/lib/mirage";

export default function MirageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      makeServer();
    }
  }, []);

  return <>{children}</>;
}

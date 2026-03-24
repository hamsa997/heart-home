"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * Admin logic has been removed as per public-only conversion.
 * Redirecting any direct hits to admin back to the home page.
 */
export default function AdminLayout() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-[#fffaf9]">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-muted-foreground font-medium">Access Restricted...</p>
    </div>
  );
}

"use client";

import FloatingAI from "@/components/ai/FloatingAI";
import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-foreground">

      <FloatingAI />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

     <header className="sticky top-0 z-50 flex items-center justify-between border-b border-orange-500/10 bg-black/90 px-4 py-4 backdrop-blur-xl lg:hidden">





  <MobileSidebar />

</header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:ml-72 lg:px-8 lg:py-8">

        <div className="animate-in fade-in duration-500">
          {children}
        </div>

      </main>

    </div>
  );
}
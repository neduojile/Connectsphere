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
  <div className="hidden md:block">
        <DashboardSidebar />
      </div>

     <header className="sticky top-0 z-50 flex items-center justify-between border-b border-orange-500/10 bg-black/90 px-4 py-4 backdrop-blur-xl md:hidden">





  <MobileSidebar />

</header>

      {/* Main Content */}
<main
  className="
  mx-auto
  w-full
  max-w-[1200px]
  px-3
  py-4
  sm:px-4
  lg:ml-20
  lg:px-4
  lg:py-4
"
>

        <div className="animate-in fade-in duration-500">
          {children}
        </div>

      </main>

    </div>

  );
}
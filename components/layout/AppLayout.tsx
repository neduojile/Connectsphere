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
  <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <FloatingAI />
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Header */}
     <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/90 px-4 py-4 backdrop-blur lg:hidden">
        <h1 className="text-xl font-bold text-orange-500">
          ConnectSphere
        </h1>

        <MobileSidebar />
      </header>

      {/* Page Content */}
      <main className="p-4 sm:p-6 lg:ml-72 lg:p-8">
        {children}
      </main>
    </div>
  );
}
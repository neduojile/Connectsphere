"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import DashboardHero from "@/components/dashboard/DashboardHero";
import ActivityWidget from "@/components/dashboard/ActivityWidget";
import AIWidget from "@/components/dashboard/AIWidget";
import StatsGrid from "@/components/dashboard/StatsGrid";
import OnboardingModal from "@/components/onboarding/OnboardingModal";

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

   if (
  !user?.profile ||
  !user?.profile?.careerGoal
) {
  setShowOnboarding(true);
}
  }, []);

  return (
    <AppLayout>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[2fr_1fr]">

       <DashboardHero />

<ActivityWidget />

<AIWidget />

      </div>

      <StatsGrid />

      <OnboardingModal
        open={showOnboarding}
        onClose={() =>
          setShowOnboarding(false)
        }
      />

    </AppLayout>
  );
}
"use client";

import { motion } from "framer-motion";

import {
  FolderKanban,
  Users,
  Briefcase,
  Brain,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardHero() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(
      "connectsphere_user"
    );

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fullName =
    user?.fullName || "Explorer";

  const careerGoal =
    user?.profile?.careerGoal ||
    "Not Selected";

  const level =
    user?.profile?.experienceLevel ||
    "Beginner";

  

  const nextMilestone =
    careerGoal ===
    "Blockchain Developer"
      ? "Build your first smart contract"
      : careerGoal ===
        "Cybersecurity Engineer"
      ? "Complete a security lab"
      : careerGoal ===
        "AI Engineer"
      ? "Build your first AI project"
      : "Complete your profile";

  const verses = [
    {
      text: "I can do all things through Christ who strengthens me.",
      ref: "Philippians 4:13",
    },
    {
      text: "Trust in the Lord with all your heart.",
      ref: "Proverbs 3:5",
    },
    {
      text: "Commit your work to the Lord.",
      ref: "Proverbs 16:3",
    },
    {
      text: "For I know the plans I have for you.",
      ref: "Jeremiah 29:11",
    },
  ];

  const todayVerse =
    verses[
      new Date().getDate() %
        verses.length
    ];

  const profileComplete =
    careerGoal !== "Not Selected";

  const completionPercentage =
    profileComplete ? 100 : 60;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
     className="relative overflow-hidden rounded-3xl border border-border bg-zinc-950 p-4 md:p-5 lg:p-6"
    >
      <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

     <div className="flex items-center gap-3">

  <img
    src="/images/logo.png"
    alt="ConnectSphere"
    className="h-10 w-10 object-contain"
  />

  <div>

    <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
      ConnectSphere Dashboard
    </p>

  </div>

</div>

 <h1 className="mt-4 text-2xl md:text-3xl lg:text-[3rem] font-black leading-tight">
        Welcome Back,
        <br />
        {fullName}
      </h1>

    <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
        Your personalized growth journey is
        ready. Explore communities,
        projects, opportunities and
        mentorship paths designed around
        your goals.
      </p>

            {!profileComplete && (
        <div className="mt-6 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">

          <h3 className="font-bold text-orange-500">
            Complete Your Profile
          </h3>

          <p className="mt-2 text-zinc-300">
            Unlock personalized mentors,
            projects, communities and
            opportunities.
          </p>

          <button
            onClick={() =>
              (window.location.href =
                "/dashboard")
            }
            className="mt-4 rounded-xl bg-orange-500 px-5 py-2 font-semibold text-black"
          >
            Continue Setup
          </button>

        </div>
      )}

     <motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.8,
  }}
  className="relative mt-6 overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-zinc-950 to-zinc-950 p-5"
>

  <div className="absolute -top-4 md:p-4 md:p-8 right-0 h-24 w-24 rounded-full bg-orange-500/20 blur-3xl animate-pulse" />

  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />

  <motion.div
    animate={{
      x: [0, 5, 0, -5, 0],
      y: [0, -2, 0, 2, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
    }}
    className="absolute right-10 top-4 md:p-4 md:p-8 text-orange-500/20 text-6xl font-black"
  >
    ✦
  </motion.div>

  <div className="relative z-10">

    <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
      Verse Of The Day
    </p>

    <motion.p
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      className="mt-4 text-xl italic text-white"
    >
      "{todayVerse.text}"
    </motion.p>

    <motion.p
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      className="mt-3 font-semibold text-orange-500"
    >
      {todayVerse.ref}
    </motion.p>

  </div>

</motion.div>
<div className="mt-6 rounded-2xl border border-border bg-card/30 p-5">

  <h3 className="font-bold text-orange-500">
    Today's Growth Mission
  </h3>

  <div className="mt-4 space-y-3">

    <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-3">

      <FolderKanban
        size={18}
        className="text-orange-500"
      />

      <span>
        Join a project
      </span>

    </div>

    <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-3">

      <Users
        size={18}
        className="text-orange-500"
      />

      <span>
        Build your network
      </span>

    </div>

    <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-3">

      <Brain
        size={18}
        className="text-orange-500"
      />

      <span>
        Complete your growth profile
      </span>

    </div>

    <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-3">

      <Briefcase
        size={18}
        className="text-orange-500"
      />

      <span>
        Explore opportunities
      </span>

    </div>

  </div>

</div>

<div className="mt-8 grid gap-4 md:grid-cols-2">

  <div className="rounded-2xl border border-border bg-card/30 p-4">

    <p className="text-sm text-zinc-500">
      Career Goal
    </p>

    <h3 className="mt-2 text-xl font-bold text-orange-500">
      {careerGoal}
    </h3>

  </div>

  <div className="rounded-2xl border border-border bg-card/30 p-4">

    <p className="text-sm text-zinc-500">
      Experience Level
    </p>

    <h3 className="mt-2 text-xl font-bold text-orange-500">
      {level}
    </h3>

  </div>

  <div className="rounded-2xl border border-border bg-card/30 p-4">

    <p className="text-sm text-zinc-500">
      Platform Status
    </p>

    <h3 className="mt-2 text-xl font-bold text-green-500">
      Active
    </h3>

  </div>

  <div className="rounded-2xl border border-border bg-card/30 p-4">

    <p className="text-sm text-zinc-500">
      Next Milestone
    </p>

    <h3 className="mt-2 text-lg font-bold text-orange-500">
      {nextMilestone}
    </h3>

  </div>

</div>

<div className="mt-8">

  <div className="mb-2 flex items-center justify-between">

    <span className="text-sm text-muted-foreground">
      Profile Completion
    </span>

    <span className="text-sm font-bold text-orange-500">
      {completionPercentage}%
    </span>

  </div>

  <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

    <div
      className="h-full rounded-full bg-orange-500 transition-all duration-500"
      style={{
        width: `${completionPercentage}%`,
      }}
    />

  </div>

</div>

<div className="mt-8">

  <h3 className="mb-4 text-xl font-bold">
    Quick Actions
  </h3>

  <div className="grid gap-4 md:grid-cols-2">

    <button
      onClick={() =>
        (window.location.href =
          "/projects")
      }
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-orange-500"
    >

      <div className="flex items-center gap-3">

        <FolderKanban
          size={22}
          className="text-orange-500"
        />

        <h4 className="font-bold">
          Projects
        </h4>

      </div>

      <p className="mt-3 text-sm text-zinc-500">
        Create, manage and collaborate on projects.
      </p>

    </button>

    <button
      onClick={() =>
        (window.location.href =
          "/communities")
      }
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-orange-500"
    >

      <div className="flex items-center gap-3">

        <Users
          size={22}
          className="text-orange-500"
        />

        <h4 className="font-bold">
          Communities
        </h4>

      </div>

      <p className="mt-3 text-sm text-zinc-500">
        Discover and join professional communities.
      </p>

    </button>

    <button
      onClick={() =>
        (window.location.href =
          "/opportunities")
      }
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-orange-500"
    >

      <div className="flex items-center gap-3">

        <Briefcase
          size={22}
          className="text-orange-500"
        />

        <h4 className="font-bold">
          Opportunities
        </h4>

      </div>

      <p className="mt-3 text-sm text-zinc-500">
        Browse jobs, internships and grants.
      </p>

    </button>

    <button
      onClick={() =>
        (window.location.href =
          "/ai-coach")
      }
      className="rounded-2xl border border-orange-500 bg-orange-500/10 p-5 text-left transition hover:bg-orange-500/20"
    >

      <div className="flex items-center gap-3">

        <Brain
          size={22}
          className="text-orange-500"
        />

        <h4 className="font-bold text-orange-500">
          AI Coach
        </h4>

      </div>

      <p className="mt-3 text-sm text-zinc-400">
        Personalized career and growth recommendations.
      </p>

    </button>

  </div>

</div>
    </motion.div>
  );
}
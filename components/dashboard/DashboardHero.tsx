"use client";

import { motion } from "framer-motion";
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

  const connectScore =
    user?.profile?.connectScore || 50;

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
      className="relative overflow-hidden rounded-3xl border border-border bg-zinc-950 p-6 md:p-8 lg:p-10"
    >
      <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <p className="text-xs uppercase tracking-[0.4em] text-orange-500 md:text-sm">
        ConnectSphere Dashboard
      </p>

      <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl xl:text-6xl">
        Welcome Back,
        <br />
        {fullName}
      </h1>

      <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-base lg:text-lg">
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

  <div className="absolute -top-8 right-0 h-24 w-24 rounded-full bg-orange-500/20 blur-3xl animate-pulse" />

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
    className="absolute right-10 top-8 text-orange-500/20 text-6xl font-black"
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

        <ul className="mt-4 space-y-2 text-zinc-300">
          <li>✓ Join one community</li>
          <li>✓ Connect with one mentor</li>
          <li>✓ Explore one opportunity</li>
          <li>✓ Complete your profile</li>
        </ul>

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
            ConnectScore
          </p>

          <h3 className="mt-2 text-xl font-bold text-orange-500">
            {connectScore}
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

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">

        <button
          onClick={() =>
            (window.location.href =
              "/communities")
          }
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400"
        >
          Explore Communities
        </button>

        <button
          onClick={() =>
            (window.location.href =
              "/dashboard")
          }
          className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:border-zinc-500"
        >
          Continue Growth Journey
        </button>

      </div>

    </motion.div>
  );
}
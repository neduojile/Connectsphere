"use client";

import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import CountUp from "react-countup";

import {
  Trophy,
  Users,
  FolderKanban,
  Network,
} from "lucide-react";

export default function StatsGrid() {
  const [stats, setStats] =
    useState([
      {
        title:
          "ConnectScore",
        value: 0,
        icon: Trophy,
        color:
          "text-orange-500",
        border:
          "border-orange-500/20",
      },
      {
        title:
          "Communities",
        value: 0,
        icon: Users,
        color:
          "text-orange-400",
        border:
          "border-zinc-700",
      },
      {
        title:
          "Projects",
        value: 0,
        icon:
          FolderKanban,
        color:
          "text-orange-400",
        border:
          "border-zinc-700",
      },
      {
        title:
          "Connections",
        value: 0,
        icon: Network,
        color:
          "text-orange-400",
        border:
          "border-zinc-700",
      },
    ]);

  useEffect(() => {
    async function loadStats() {
      const storedUser =
        localStorage.getItem(
          "connectsphere_user"
        );

      if (!storedUser)
        return;

      const user =
        JSON.parse(
          storedUser
        );

      const response =
        await fetch(
          "/api/dashboard",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId:
                user.id,
            }),
          }
        );

      const data =
        await response.json();

      setStats([
  {
    title: "Projects Created",
    value: data.projectsCreated || 0,
    icon: FolderKanban,
    color: "text-orange-500",
    border: "border-orange-500/20",
  },

  {
    title: "Projects Joined",
    value: data.projectsJoined || 0,
    icon: Users,
    color: "text-orange-400",
    border: "border-zinc-700",
  },

  {
    title: "Questions Asked",
    value: data.questionsAsked || 0,
    icon: Trophy,
    color: "text-orange-400",
    border: "border-zinc-700",
  },

  {
    title: "Resources Shared",
    value: data.resourcesShared || 0,
    icon: Network,
    color: "text-orange-400",
    border: "border-zinc-700",
  },
]);
    }

    loadStats();
  }, []);

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4">
      {stats.map(
        (
          stat,
          index
        ) => {
          const Icon =
            stat.icon;

          return (
            <motion.div
              key={
                stat.title
              }
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index *
                  0.1,
              }}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              className={`rounded-3xl border ${stat.border} bg-zinc-950 p-6`}
            >
              <div className="flex items-center justify-between">
                <Icon
                  size={
                    24
                  }
                  className={
                    stat.color
                  }
                />

                <span className="text-xs text-zinc-500">
                  LIVE
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-black md:text-5xl">
                <CountUp
                  end={
                    stat.value
                  }
                  duration={
                    1.5
                  }
                />
              </h2>

              <p className="mt-2 text-muted-foreground">
                {
                  stat.title
                }
              </p>
            </motion.div>
          );
        }
      )}
    </div>
  );
}
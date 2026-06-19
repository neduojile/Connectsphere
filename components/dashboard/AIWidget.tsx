"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  ArrowRight,
  FolderKanban,
  Users,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AIWidget() {

  const router =
    useRouter();

  return (

    <motion.div
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-zinc-950 p-6"
    >

      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-orange-500/10 p-3">

          <Brain
            size={24}
            className="text-orange-500"
          />

        </div>

        <div>

          <h2 className="font-bold">
            ConnectSphere AI
          </h2>

          <p className="text-sm text-zinc-500">
            Personalized career intelligence
          </p>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

        <div className="flex items-center gap-2">

          <Sparkles
            size={16}
            className="text-orange-500"
          />

          <p className="text-sm text-zinc-400">
            Recommended Next Steps
          </p>

        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-3 rounded-xl border border-zinc-800 p-4">

          <FolderKanban
            size={18}
            className="text-orange-500"
          />

          <span>
            Join a Project
          </span>

        </div>

        <div className="flex items-center gap-3 rounded-xl border border-zinc-800 p-4">

          <Users
            size={18}
            className="text-orange-500"
          />

          <span>
            Grow Your Network
          </span>

        </div>

        <div className="flex items-center gap-3 rounded-xl border border-zinc-800 p-4">

          <Briefcase
            size={18}
            className="text-orange-500"
          />

          <span>
            Explore Opportunities
          </span>

        </div>

      </div>

      <button
        onClick={() =>
          router.push("/opportunities")
        }
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400"
      >

        Explore Opportunities

        <ArrowRight size={18} />

      </button>

    </motion.div>

  );

}
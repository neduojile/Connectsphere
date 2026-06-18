"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AIWidget() {
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
            AI Growth Coach
          </h2>

          <p className="text-sm text-zinc-500">
            Personalized recommendations
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card/40 p-4">
        <div className="flex items-center gap-2">
          <Sparkles
            size={16}
            className="text-orange-500"
          />

          <p className="text-sm text-muted-foreground">
            AI is analyzing your profile...
          </p>
        </div>

        <h3 className="mt-4 text-3xl font-black text-orange-500">
          92%
        </h3>

        <p className="text-sm text-zinc-500">
          Growth Potential
        </p>
      </div>

      <div className="mt-6 space-y-3">

        <div className="rounded-xl border border-border p-3">
          Join Product Builders Community
        </div>

        <div className="rounded-xl border border-border p-3">
          Connect with 3 Recommended Mentors
        </div>

        <div className="rounded-xl border border-border p-3">
          Complete Profile for Better Matches
        </div>

      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400">
        Open AI Coach

        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}
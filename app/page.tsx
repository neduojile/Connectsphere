import AIGrowthCoach from "@/components/landing/AIGrowthCoach";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/landing/StatsCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24">
        
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />

        <span className="mb-4 text-sm font-medium text-orange-500">
          The Intelligent Collaboration Ecosystem
        </span>

        <h1 className="max-w-5xl text-6xl font-bold leading-tight md:text-8xl">
          Connect.
          <br />
          Collaborate.
          <br />
          Grow.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-zinc-400">
          Discover mentors, communities, opportunities, and projects
          designed to help RCCG youths create meaningful impact globally.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-black transition hover:bg-orange-400">
            Get Started
          </button>

          <button className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:border-zinc-500">
            Explore Communities
          </button>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <StatsCard
            number="5000+"
            label="Youth Connections"
          />

          <StatsCard
            number="200+"
            label="Mentors"
          />

          <StatsCard
            number="100+"
            label="Communities"
          />
        </div>
      </section>
      <AIGrowthCoach />
    </main>
  );
}
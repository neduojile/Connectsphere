"use client";

import {
  Users,
  Briefcase,
  FolderKanban,
  Bot,
  UserPlus,
  Handshake,
  Target,
  Trophy,
} from "lucide-react";

import { motion } from "framer-motion";

import Link from "next/link";
import AIGrowthCoach from "@/components/landing/AIGrowthCoach";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/landing/StatsCard";
import ImageSection from "@/components/landing/ImageSection";
import { useEffect, useState } from "react";

export default function Home() {

  const [stats, setStats] = useState({
  users: 0,
  communities: 0,
  projects: 0,
});

useEffect(() => {
  async function loadStats() {
    try {
      const response =
        await fetch(
          "/api/public-stats"
        );

      const data =
        await response.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  loadStats();
}, []);


  return (
    <main className="min-h-screen bg-card text-white">
      <Navbar/>

      

<section className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-10 md:py-16">

  <div className="absolute left-1/2 top-40 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

  <div className="grid items-center gap-16 lg:grid-cols-2">

    {/* LEFT SIDE */}

   

<div className="relative">

  {/* Glass Cube */}

<motion.div
  animate={{
    rotate: [0, 360],
    y: [0, -20, 0],
  }}
  transition={{
    rotate: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="
    absolute
    left-20
    top-10
    hidden
    lg:flex
    items-center
    justify-center
    h-[350px]
    w-[350px]
    -z-10
  "
>
  {/* Outer Face */}
  <div
    className="
      absolute
      h-[250px]
      w-[250px]
      rounded-[40px]
      border
      border-orange-500/30
      bg-white/[0.03]
      backdrop-blur-xl
      shadow-[0_0_100px_rgba(249,115,22,0.25)]
    "
  />

  {/* Back Face */}
  <div
    className="
      absolute
      h-[250px]
      w-[250px]
      translate-x-10
      -translate-y-10
      rounded-[40px]
      border
      border-orange-500/15
    "
  />

  {/* Connecting Lines */}
  <div className="absolute left-[90px] top-[70px] h-[55px] w-px bg-orange-500/30" />
  <div className="absolute right-[90px] top-[70px] h-[55px] w-px bg-orange-500/30" />
  <div className="absolute left-[90px] bottom-[70px] h-[55px] w-px bg-orange-500/30" />
  <div className="absolute right-[90px] bottom-[70px] h-[55px] w-px bg-orange-500/30" />
</motion.div>

<div
  className="
    absolute
    left-20
    top-16
    hidden
    lg:block
    h-[400px]
    w-[400px]
    rounded-full
    bg-orange-500/15
    blur-[150px]
    -z-20
  "
/>

<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 3,
    repeat: Infinity,
  }}
  className="
    absolute
    right-10
    top-10
    hidden
    lg:block
    rounded-2xl
    border
    border-zinc-800
    bg-zinc-950/80
    px-4
    py-3
    backdrop-blur
  "
>

</motion.div>

<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
  }}
  className="
    absolute
    right-20
    top-40
    hidden
    lg:block
    rounded-2xl
    border
    border-zinc-800
    bg-zinc-950/80
    px-4
    py-3
    backdrop-blur
  "
>
</motion.div>

<motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{
    duration: 5,
    repeat: Infinity,
  }}
  className="
    absolute
    left-10
    bottom-20
    hidden
    lg:block
    rounded-2xl
    border
    border-zinc-800
    bg-zinc-950/80
    px-4
    py-3
    backdrop-blur
  "
>

</motion.div>


      <span className="mb-4 block text-sm font-medium uppercase tracking-[0.25em] text-orange-500">
        The Intelligent Collaboration Ecosystem
      </span>

     <h1 className="relative z-10 text-3xl md:text-5xl font-black leading-tight md:text-4xl md:text-7xl lg:text-4xl md:text-7xl">
        Connect.
        <br />
        Collaborate.
        <br />
        Grow.
      </h1>

      <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
        Discover mentors, communities,
        opportunities and projects designed
        to help RCCG youths create meaningful
        impact globally.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 md:gap-4">

        <Link
          href="/register"
          className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-black transition hover:bg-orange-400"
        >
          Get Started
        </Link>

        <Link
          href="/login"
          className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:border-orange-500"
        >
          Explore Communities
        </Link>

      </div>
<div className="mt-10 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-1 md:grid-cols-3 md:gap-6">

      <StatsCard
  number={stats.users.toString()}
  label="Members"
/>

<StatsCard
  number={stats.communities.toString()}
  label="Communities"
/>

<StatsCard
  number={stats.projects.toString()}
  label="Projects"
/>

      </div>

    </div>

    {/* RIGHT SIDE */}

  <div className="relative hidden h-[400px] lg:block lg:h-[550px]">

      <img
        src="/images/community.jpg"
        alt="Community"
        className="
          absolute
          right-0
          top-0
        w-[380px]
aspect-[4/5]
object-cover
          rotate-3
         rounded-[36px]
          border
          border-zinc-800
          shadow-2xl
          transition-all
          duration-500
          hover:scale-105
        "
      />

      <img
        src="/images/connected.jpg"
        alt="Connections"
        className="
          absolute
          left-0
          top-24
         w-[250px]
aspect-[4/5]
object-cover
          -rotate-6
          rounded-[36px]
          border
          border-zinc-800
          shadow-xl
          transition-all
          duration-500
          hover:scale-105
        "
      />

      <img
        src="/images/projects.jpg"
        alt="Projects"
        className="
          absolute
          bottom-0
          right-8
        w-[280px]
aspect-[4/5]
object-cover
          rotate-12
          rounded-[36px]
          border
          border-zinc-800
          shadow-xl
          transition-all
          duration-500
          hover:scale-105
        "
      />

      <div
        className="
          absolute
          left-12
          bottom-20
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950/90
          p-5
          backdrop-blur
          shadow-xl
        "
      >
       <p className="text-sm text-zinc-400">
  Active Members
</p>

<h3 className="text-3xl font-black text-orange-500">
  {stats.users}
</h3>
      </div>

    </div>

  </div>

</section>
<section className="mx-auto max-w-7xl px-6 py-12 md:py-24">

  <div className="text-center">

    <span className="text-sm font-medium uppercase tracking-[0.3em] text-orange-500">
      Platform Features
    </span>

    <h2 className="mt-4 text-3xl md:text-5xl font-black">
      Everything You Need To Grow
    </h2>

    <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
      ConnectSphere combines communities,
      opportunities, projects and AI-powered
      guidance into one intelligent ecosystem.
    </p>

  </div>

  <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 md:p-4 md:p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-500">

     <Users
  size={48}
  className="text-orange-500"
/>

      <img
  src="/images/community.jpg"
  alt=""
 className="mb-4 h-40 w-full rounded-[24px] object-cover transition-all duration-500 group-hover:scale-105"
/>

      <p className="mt-3 text-zinc-400">
        Discover people who share your
        interests, goals and passions.
      </p>

    </div>

    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 md:p-4 md:p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-500">

      <Briefcase
  size={48}
  className="text-orange-500"
/>

      <img
  src="/images/opportunities.jpg"
  alt=""
  className="mb-4 h-32 w-full rounded-2xl object-cover"
/>

      <p className="mt-3 text-zinc-400">
        Explore internships, scholarships,
        jobs and growth opportunities.
      </p>

    </div>

    <div className="group rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-4 md:p-4 md:p-8 transition-all duration-500 hover:-translate-y-3 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]">

    <FolderKanban
  size={48}
  className="text-orange-500"
/>

     <img
  src="/images/projects.jpg"
  alt=""
  className="mb-4 h-32 w-full rounded-2xl object-cover"
/>

      <p className="mt-3 text-zinc-400">
        Collaborate with others and build
        impactful real-world solutions.
      </p>

    </div>

    <div className="group rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-4 md:p-4 md:p-8 transition-all duration-500 hover:-translate-y-3 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]">

     <Bot
  size={48}
  className="text-orange-500"
/>

      <img
  src="/images/connected.jpg"
  alt=""
  className="mb-4 h-32 w-full rounded-2xl object-cover"
/>

      <p className="mt-3 text-zinc-400">
        Receive personalized guidance,
        recommendations and growth insights.
      </p>

    </div>

  </div>

</section>

<section className="mx-auto max-w-7xl px-6 py-12 md:py-24">

  <div className="text-center">

    <span className="text-sm font-medium uppercase tracking-[0.3em] text-orange-500">
      Your Journey
    </span>

    <h2 className="mt-4 text-3xl md:text-5xl font-black">
      How Growth Happens
    </h2>

    <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
      ConnectSphere guides you from connection
      to collaboration, opportunity and leadership.
    </p>

  </div>

  <div className="mt-20 grid gap-4 md:p-4 md:p-8 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    <div className="group rounded-[32px] border border-zinc-800 bg-zinc-950/60 p-4 md:p-4 md:p-8 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:border-orange-500">

      <UserPlus
        size={56}
        className="text-orange-500"
      />

      <h3 className="mt-6 text-2xl font-bold">
        Join
      </h3>

      <p className="mt-3 text-zinc-400">
        Create your profile and become part
        of a global network of ambitious youth.
      </p>

    </div>

    <div className="group rounded-[32px] border border-zinc-800 bg-zinc-950/60 p-4 md:p-4 md:p-8 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:border-orange-500">

      <Handshake
        size={56}
        className="text-orange-500"
      />

      <h3 className="mt-6 text-2xl font-bold">
        Connect
      </h3>

      <p className="mt-3 text-zinc-400">
        Discover communities, mentors and
        collaborators who share your goals.
      </p>

    </div>

    <div className="group rounded-[32px] border border-zinc-800 bg-zinc-950/60 p-4 md:p-4 md:p-8 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:border-orange-500">

      <Target
        size={56}
        className="text-orange-500"
      />

      <h3 className="mt-6 text-2xl font-bold">
        Build
      </h3>

      <p className="mt-3 text-zinc-400">
        Work on projects, develop skills and
        pursue opportunities together.
      </p>

    </div>

    <div className="group rounded-[32px] border border-zinc-800 bg-zinc-950/60 p-4 md:p-4 md:p-8 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:border-orange-500">

      <Trophy
        size={56}
        className="text-orange-500"
      />

      <h3 className="mt-6 text-2xl font-bold">
        Lead
      </h3>

      <p className="mt-3 text-zinc-400">
        Grow into a leader capable of creating
        meaningful impact in your community.
      </p>

    </div>

  </div>

</section>

<section className="relative mx-auto my-24 max-w-7xl overflow-hidden rounded-3xl">

  <img
    src="/images/purpose.jpg"
    alt="Purpose"
   className="h-[450px] w-full object-cover rounded-[40px] transition-all duration-700 hover:scale-105"
  />

  <div className="absolute inset-0 bg-black/70" />

  <div className="absolute inset-0 flex items-center justify-center px-8 text-center">

    <div>

      <h2 className="text-3xl md:text-5xl font-black">
        Growth With Purpose
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">
        Success is more than achievements.
        ConnectSphere encourages character,
        leadership, service, faith, and
        purpose-driven growth alongside
        professional development.
      </p>

    </div>

  </div>

</section>

<section className="mx-auto max-w-7xl px-6 py-12 md:py-24">

  <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 p-6 md:p-12 text-center shadow-2xl">

    <h2 className="text-3xl md:text-5xl font-black text-black">
      Ready To Accelerate Your Growth?
    </h2>

    <p className="mx-auto mt-6 max-w-3xl text-lg text-black/80">
      Join thousands of students, innovators,
      professionals and leaders building
      meaningful connections, projects and
      opportunities through ConnectSphere.
    </p>

    <div className="mt-10 flex flex-wrap justify-center gap-4">

      <Link
        href="/register"
        className="rounded-2xl bg-black px-8 py-4 font-bold text-white transition hover:scale-105"
      >
        Get Started Free
      </Link>

      <Link
        href="/login"
        className="rounded-2xl border-2 border-black px-8 py-4 font-bold text-black transition hover:bg-black hover:text-white"
      >
        Sign In
      </Link>

    </div>

  </div>

</section>

<footer className="border-t border-zinc-800 px-6 py-10 md:py-16">

  <div className="mx-auto grid max-w-7xl gap-6 md:p-12 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    <div>

      <h3 className="text-2xl font-black text-orange-500">
        ConnectSphere
      </h3>

      <p className="mt-4 text-zinc-400">
        Connect. Collaborate. Grow.
      </p>

    </div>

    <div>

      <h4 className="font-bold">
        Platform
      </h4>

      <div className="mt-4 space-y-3 text-zinc-400">

        <p>Communities</p>
        <p>Projects</p>
        <p>Opportunities</p>

      </div>

    </div>

    <div>

      <h4 className="font-bold">
        Resources
      </h4>

      <div className="mt-4 space-y-3 text-zinc-400">

        <p>AI Coach</p>
        <p>Mentorship</p>
        <p>Growth Journey</p>

      </div>

    </div>

    <div>

      <h4 className="font-bold">
        Mission
      </h4>

      <p className="mt-4 text-zinc-400">
        Empowering youth to build meaningful
        connections, discover opportunities
        and create impact globally.
      </p>

    </div>

  </div>

  <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-zinc-500">

    © 2026 ConnectSphere. All rights reserved.

  </div>

</footer>

      <AIGrowthCoach />

      <main className="relative min-h-screen bg-card text-white overflow-hidden"></main>
    
    <div className="pointer-events-none absolute inset-0">

  <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

  <div className="absolute right-20 top-[40%] h-96 w-96 rounded-full bg-orange-400/10 blur-[120px]" />

</div>
</main>
  );
}
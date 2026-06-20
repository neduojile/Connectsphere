"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import CommunitiesClient from "@/components/communities/CommunitiesClient";
import {
  Users,
  Network,
  Activity,
} from "lucide-react";

export default function CommunitiesPage() {

  const [communities,
    setCommunities] =
    useState<any[]>([]);

  const [totalMembers,
    setTotalMembers] =
    useState(0);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    async function loadCommunities() {

      try {

        const response =
          await fetch(
            "/api/communities/list"
          );

        const data =
          await response.json();

        if (data.success) {

          setCommunities(
            data.communities || []
          );

          setTotalMembers(
            data.totalMembers || 0
          );

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadCommunities();

  }, []);

  if (loading) {

    return (
      <AppLayout>
        <div className="p-10">
          Loading Communities...
        </div>
      </AppLayout>
    );

  }

  return (
    <AppLayout>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="mb-12">

          <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
            ConnectSphere
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-black">
            Communities
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Discover communities,
            connect with like-minded
            people, collaborate on
            projects and grow together.
          </p>

        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center justify-between">

              <Users
                size={24}
                className="text-orange-500"
              />

              <span className="text-xs text-zinc-500">
                LIVE
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-black text-orange-500">
              {communities.length}
            </h2>

            <p className="text-zinc-500">
              Communities
            </p>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center justify-between">

              <Network
                size={24}
                className="text-orange-500"
              />

              <span className="text-xs text-zinc-500">
                LIVE
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-black text-orange-500">
              {totalMembers}
            </h2>

            <p className="text-zinc-500">
              Community Members
            </p>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center justify-between">

              <Activity
                size={24}
                className="text-orange-500"
              />

              <span className="text-xs text-zinc-500">
                ACTIVE
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-black text-orange-500">
              {communities.length}
            </h2>

            <p className="text-zinc-500">
              Active Communities
            </p>

          </div>

        </div>

        <CommunitiesClient
          communities={communities}
        />

      </div>

    </AppLayout>
  );
}
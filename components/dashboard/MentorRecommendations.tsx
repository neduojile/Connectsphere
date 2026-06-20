"use client";

import { useEffect, useState } from "react";

export default function MentorRecommendations() {
  const [mentors, setMentors] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadMentors() {
  try {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) {
      setLoading(false);
      return;
    }

    const user =
      JSON.parse(storedUser);

    const response =
      await fetch(
        `/api/mentors?userId=${user.id}`
      );

    const data =
      await response.json();

    setMentors(
      data.mentors || []
    );
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

    loadMentors();
  }, []);

  return (
    <div className="mt-8">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Recommended Mentors
        </h2>

        <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-500">
          AI Matched
        </span>

      </div>

      {loading ? (

        <div className="grid gap-4 md:grid-cols-1 md:grid-cols-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-border bg-zinc-950 p-5"
            >
              <div className="h-14 w-14 rounded-full bg-zinc-800" />

              <div className="mt-4 h-5 rounded bg-zinc-800" />

              <div className="mt-3 h-4 rounded bg-zinc-800" />

              <div className="mt-3 h-4 rounded bg-zinc-800" />
            </div>
          ))}

        </div>

      ) : mentors.length === 0 ? (

        <div className="rounded-2xl border border-border bg-zinc-950 p-4 md:p-4 md:p-8 text-center">

          <h3 className="text-xl font-bold">
            No Mentor Match Yet
          </h3>

          <p className="mt-2 text-zinc-500">
            Complete your onboarding to
            receive personalized mentor
            recommendations.
          </p>

        </div>

      ) : (

        <div className="grid gap-4 md:grid-cols-1 md:grid-cols-3">

          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-2xl border border-border bg-zinc-950 p-5 transition hover:border-orange-500"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-black">
                {mentor.fullName
                  .split(" ")
                  .map(
                    (name: string) =>
                      name[0]
                  )
                  .join("")}
              </div>

              <h3 className="text-lg font-bold">
                {mentor.fullName}
              </h3>

              <p className="mt-1 text-orange-500">
                {mentor.profession}
              </p>

              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {mentor.location}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Specializes in:
                {" "}
                {mentor.category}
              </p>

              <p className="mt-3 text-yellow-500">
                ⭐ {mentor.rating || 5.0}
              </p>

              <button className="mt-4 w-full rounded-xl bg-orange-500 py-2 font-semibold text-black transition hover:bg-orange-400">
                Connect
              </button>

            </div>
          ))}

        </div>

      )}

    </div>
  );
}
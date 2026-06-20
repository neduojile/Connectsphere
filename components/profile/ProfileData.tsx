"use client";

import { useEffect, useState } from "react";

import {
  Award,
  MapPin,
  Target,
  Users,
} from "lucide-react";

export default function ProfileData() {
  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      const storedUser =
        localStorage.getItem(
          "connectsphere_user"
        );

      if (!storedUser) return;

      const user =
        JSON.parse(storedUser);

      const response = await fetch(
        "/api/profile",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        }
      );

      const data =
        await response.json();

      setProfile(data);
    }

    loadProfile();
  }, []);

  if (!profile) {
    return (
      <div className="mt-8">
        Loading profile...
      </div>
    );
  }

  const completion =
    [
      profile.fullName,
      profile.email,
      profile.profile?.bio,
      profile.profile?.location,
      profile.profile?.headline,
      profile.profile?.careerGoal,
      profile.profile?.interests,
      profile.profile?.skills,
      profile.profile?.experienceLevel,
      profile.profile?.linkedinUrl,
      profile.profile?.githubUrl,
      profile.profile?.portfolioUrl,
    ].filter(Boolean).length * 8;

  return (
    <>

      <div className="mt-8 grid gap-4 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <Award
            size={22}
            className="text-orange-500"
          />

          <h3 className="mt-3 text-3xl font-black text-orange-500">
            {profile.profile?.connectScore || 0}
          </h3>

          <p className="text-zinc-500">
            ConnectScore
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <Users
            size={22}
            className="text-orange-500"
          />

          <h3 className="mt-3 text-3xl font-black text-orange-500">
            {profile.memberships?.length || 0}
          </h3>

          <p className="text-zinc-500">
            Communities
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <Target
            size={22}
            className="text-orange-500"
          />

          <h3 className="mt-3 text-3xl font-black text-orange-500">
            {Math.min(
              completion,
              100
            )}
            %
          </h3>

          <p className="text-zinc-500">
            Profile Complete
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <MapPin
            size={22}
            className="text-orange-500"
          />

          <h3 className="mt-3 text-lg font-bold">
            {profile.profile?.location ||
              "Not Set"}
          </h3>

          <p className="text-zinc-500">
            Location
          </p>
        </div>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">
            About Me
          </h2>

          <p className="mt-4 text-muted-foreground">
            {profile.profile?.bio ||
              "No bio added yet."}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">
            Professional Headline
          </h2>

          <p className="mt-4 text-muted-foreground">
            {profile.profile?.headline ||
              "No headline added"}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">
            Career Goal
          </h2>

          <p className="mt-4 text-muted-foreground">
            {profile.profile?.careerGoal ||
              "Not set yet."}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">
            Experience Level
          </h2>

          <p className="mt-4 text-muted-foreground">
            {profile.profile?.experienceLevel ||
              "Not specified"}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">
            Availability
          </h2>

          <p className="mt-4 font-semibold text-green-500">
            {profile.profile?.availabilityStatus ||
              "Open"}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">
            Faith Preference
          </h2>

          <p className="mt-4 text-muted-foreground">
            {profile.profile?.faithBased
              ? "Enabled"
              : "Disabled"}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">
            Interests
          </h2>

          <p className="mt-4 text-muted-foreground">
            {profile.profile?.interests ||
              "No interests added"}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">
            Skills
          </h2>

          <p className="mt-4 text-muted-foreground">
            {profile.profile?.skills ||
              "No skills added"}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold">
            Social Links
          </h2>

          <div className="mt-4 space-y-3">

           <p>
  <strong>GitHub:</strong>{" "}

  {profile.profile?.githubUrl ? (
    <a
      href={
        profile.profile.githubUrl
      }
      target="_blank"
      rel="noopener noreferrer"
      className="text-orange-500 hover:underline"
    >
      Open GitHub
    </a>
  ) : (
    "Not Added"
  )}
</p>

            <p>
  <strong>LinkedIn:</strong>{" "}

  {profile.profile?.linkedinUrl ? (
    <a
      href={
        profile.profile.linkedinUrl
      }
      target="_blank"
      rel="noopener noreferrer"
      className="text-orange-500 hover:underline"
    >
      Open LinkedIn
    </a>
  ) : (
    "Not Added"
  )}
</p>

           <p>
  <strong>Portfolio:</strong>{" "}

  {profile.profile?.portfolioUrl ? (
    <a
      href={
        profile.profile.portfolioUrl
      }
      target="_blank"
      rel="noopener noreferrer"
      className="text-orange-500 hover:underline"
    >
      Open Portfolio
    </a>
  ) : (
    "Not Added"
  )}
</p>

          </div>
        </div>

      </div>

    </>
  );
}
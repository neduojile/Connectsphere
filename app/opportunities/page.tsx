"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Briefcase,
  MapPin,
  Bookmark,
  Building2,
  Calendar,
} from "lucide-react";

export default function OpportunitiesPage() {

  const [opportunities,
    setOpportunities] =
    useState<any[]>([]);

  const [saved,
    setSaved] =
    useState<any[]>([]);

    const [applications,
  setApplications] =
  useState<any[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [category,
    setCategory] =
    useState("All");

  const [user,
    setUser] =
    useState<any>(null);

  const [title,
    setTitle] =
    useState("");

  const [organization,
    setOrganization] =
    useState("");

  const [location,
    setLocation] =
    useState("");

  const [workMode,
    setWorkMode] =
    useState("Remote");

  const [skills,
    setSkills] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [applyLink,
    setApplyLink] =
    useState("");

  const [deadline,
    setDeadline] =
    useState("");

  const [opportunityCategory,
    setOpportunityCategory] =
    useState("Internship");
      useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (storedUser) {

      const parsed =
        JSON.parse(
          storedUser
        );

      setUser(parsed);

      loadSaved(
        parsed.id
      );
      
      loadApplications(
  parsed.id
);

    }

    loadOpportunities();

  }, []);

  async function loadOpportunities() {

    const response =
      await fetch(
        "/api/opportunities/list"
      );

    const data =
      await response.json();

    setOpportunities(
      data.opportunities || []
    );

  }

  async function loadSaved(
    userId: string
  ) {

    const response =
      await fetch(
        "/api/opportunities/saved",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId,
          }),
        }
      );

    const data =
      await response.json();

    setSaved(
      data.opportunities || []
    );

  }


  async function loadApplications(
  userId: string
) {

  const response =
    await fetch(
      "/api/opportunities/my-applications",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId,
        }),
      }
    );

  const data =
    await response.json();

  setApplications(
    data.applications || []
  );

}
    async function saveOpportunity(
    opportunityId: string
  ) {

    if (!user) return;

    await fetch(
      "/api/opportunities/save",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId: user.id,
          opportunityId,
        }),
      }
    );

    loadSaved(
      user.id
    );

  }


  async function applyToOpportunity(
  opportunityId: string
) {

  if (!user)
    return;

  const response =
    await fetch(
      "/api/opportunities/apply",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId:
            user.id,
          opportunityId,
        }),
      }
    );

  const data =
    await response.json();

  if (data.success) {

    alert(
      "Application submitted"
    );

    loadApplications(
      user.id
    );

  } else {

    alert(
      data.error
    );

  }
}


  async function createOpportunity() {

    if (!user)
      return;

    const response =
      await fetch(
        "/api/opportunities/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            organization,
            category:
              opportunityCategory,
            location,
            workMode,
            skills,
            description,
            applyLink,
            deadline,
            postedById:
              user.id,
          }),
        }
      );

    if (response.ok) {

      alert(
        "Opportunity posted"
      );

      loadOpportunities();

    }

  }
const filtered =
  opportunities.filter(
    (opportunity) => {

      const matchesSearch =
        opportunity.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        opportunity.category ===
          category;

      return (
        matchesSearch &&
        matchesCategory
      );

    }
  );

return (

  <AppLayout>

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
   <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">



</div>

    <div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

  <div className="flex items-center gap-3">

    <Briefcase
      size={36}
      className="text-orange-500"
    />

    <h1 className="text-3xl md:text-3xl md:text-5xl font-black">
      Opportunities
    </h1>

  </div>

      </div>

      <p className="mt-3 text-zinc-500">

        Jobs, internships,
        scholarships, grants,
        fellowships and hackathons.

      </p>

      <div className="mt-6">

<div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

  <input
    type="text"
    placeholder="Search opportunities..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3"
  />

  <div className="mt-5 flex flex-wrap gap-3">

    {[
      "All",
      "Internship",
      "Job",
      "Scholarship",
      "Grant",
      "Hackathon",
      "Fellowship",
    ].map((item) => (

      <button
        key={item}
        onClick={() =>
          setCategory(item)
        }
        className={`rounded-xl px-4 py-2 text-sm transition ${
          category === item
            ? "bg-orange-500 text-black"
            : "bg-zinc-900 text-white"
        }`}
      >
        {item}
      </button>

    ))}

  </div>

</div>

</div>

{saved.length > 0 && (

  <div>

    <h2 className="text-2xl font-bold">
      Saved Opportunities
    </h2>

    <div className="mt-4 grid gap-4">

      {saved.map((item) => (

        <div
          key={item.id}
          className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4"
        >
          {item.opportunity?.title}
        </div>

      ))}

    </div>

  </div>

)}

{applications.length > 0 && (

  <div>

    <h2 className="text-2xl font-bold">
      My Applications
    </h2>

    <div className="mt-4 grid gap-4">

      {applications.map(
        (application) => (

          <div
            key={application.id}
            className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4"
          >

            <h3 className="font-bold">
              {
                application
                  .opportunity
                  .title
              }
            </h3>

            <p className="text-sm text-zinc-500">
              Applied Successfully
            </p>

          </div>

        )
      )}

    </div>

  </div>

)}

<div className="grid gap-6 lg:grid-cols-2">

  {filtered.map(
    (opportunity) => (

      <div
        key={opportunity.id}
        className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-orange-500"
      >

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              {opportunity.title}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-zinc-400">

              <Building2
                size={16}
              />

              {opportunity.organization}

            </div>

          </div>

          <button
            onClick={() =>
              saveOpportunity(
                opportunity.id
              )
            }
            className="rounded-xl bg-zinc-900 p-3"
          >

            <Bookmark
              size={18}
            />

          </button>

        </div>

        <p className="mt-4 text-zinc-400">
          {opportunity.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">

          <span className="rounded-full bg-orange-500/10 px-4 py-2 text-orange-500">
            {opportunity.category}
          </span>

          <span className="rounded-full bg-zinc-900 px-4 py-2">
            {opportunity.workMode}
          </span>

        </div>

        <div className="mt-5 flex flex-wrap gap-5 text-sm text-zinc-400">

          <div className="flex items-center gap-2">

            <MapPin
              size={16}
            />

            {opportunity.location}

          </div>

          <div className="flex items-center gap-2">

            <Calendar
              size={16}
            />

            {new Date(
              opportunity.deadline
            ).toLocaleDateString()}

          </div>

        </div>

        <div className="mt-5 rounded-2xl bg-zinc-900 p-4">

          <p className="mb-2 text-xs uppercase text-zinc-500">
            Skills Required
          </p>

          <p>
            {opportunity.skills}
          </p>

        </div>
<div className="mt-6 flex gap-3">

  <button
    onClick={() =>
      applyToOpportunity(
        opportunity.id
      )
    }
    className="flex-1 rounded-xl bg-orange-500 py-3 font-semibold text-black"
  >
    Apply
  </button>

  <a
    href={
      opportunity.applyLink
    }
    target="_blank"
    className="rounded-xl border border-orange-500 px-5 py-3 text-orange-500"
  >
    View
  </a>

</div>

      </div>

    )
  )}

</div>

{filtered.length === 0 && (
<div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center">

  <Briefcase
    size={60}
    className="mx-auto text-orange-500"
  />

  <h2 className="mt-5 text-3xl font-bold">
    No Opportunities Yet
  </h2>

  <p className="mt-3 text-zinc-500">
    opportunities would appear here when available
  
  </p>

</div>
)}

    </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        <h2 className="text-3xl font-black text-orange-500">
          {opportunities.length}
        </h2>

        <p>Total Opportunities</p>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        <h2 className="text-3xl font-black text-orange-500">
          {
            opportunities.filter(
              (o) =>
                o.category ===
                "Internship"
            ).length
          }
        </h2>

        <p>Internships</p>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        <h2 className="text-3xl font-black text-orange-500">
          {
            opportunities.filter(
              (o) =>
                o.category ===
                "Scholarship"
            ).length
          }
        </h2>

        <p>Scholarships</p>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        <h2 className="text-3xl font-black text-orange-500">
          {
            opportunities.filter(
              (o) =>
                o.workMode ===
                "Remote"
            ).length
          }
        </h2>

        <p>Remote</p>

      </div>

    </div>

      </div>
</AppLayout>
);
}
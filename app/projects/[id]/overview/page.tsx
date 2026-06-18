"use client";
import { useRouter } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

export default function OverviewPage() {

    const params =
  useParams();

const [project,
  setProject] =
  useState<any>(null);

  const [stats,
  setStats] =
  useState({
    members: 0,
    resources: 0,
    questions: 0,
    discussions: 0,
  });

  const [activities,
  setActivities] =
  useState<any[]>([]);

  const [showActivity, setShowActivity] =
    useState(true);

  const [showHealth, setShowHealth] =
    useState(false);

  const [showActions, setShowActions] =
    useState(false);

const router = useRouter();  

useEffect(() => {

  async function loadProject() {

    const response =
      await fetch(
        `/api/projects/${params.id}`
      );

    const data =
      await response.json();

 if (data.success) {

  setProject(
    data.project
  );

  setStats({
    members:
      data.project
        .memberships
        ?.length || 0,

    resources:
      data.project
        .resources
        ?.length || 0,

    questions:
      data.project
        .questions
        ?.length || 0,

    discussions:
      data.project
        .discussions
        ?.length || 0,
  });

}

const activityFeed = [

  ...(
    data.project.resources || []
  ).map(
    (resource: any) => ({
      type: "resource",
      title:
        resource.title,
      createdAt:
        resource.createdAt,
    })
  ),

  ...(
    data.project.questions || []
  ).map(
    (question: any) => ({
      type: "question",
      title:
        question.title,
      user:
        question.user
          ?.fullName,
      createdAt:
        question.createdAt,
    })
  ),

  ...(
    data.project.discussions || []
  ).map(
    (discussion: any) => ({
      type:
        "discussion",
      user:
        discussion.user
          ?.fullName,
      createdAt:
        discussion.createdAt,
    })
  ),

  ...(
    data.project.announcements || []
  ).map(
    (
      announcement: any
    ) => ({
      type:
        "announcement",
      title:
        announcement.title,
      createdAt:
        announcement.createdAt,
    })
  ),

];

activityFeed.sort(
  (
    a: any,
    b: any
  ) =>
    new Date(
      b.createdAt
    ).getTime() -
    new Date(
      a.createdAt
    ).getTime()
);

setActivities(
  activityFeed.slice(
    0,
    10
  )
);

  }

  loadProject();

}, [params.id]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">

      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">

        <div className="h-48 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-transparent" />

        <div className="p-8">

          <div className="flex items-start justify-between">

            <div>

              <h1 className="text-5xl font-black">
                {project?.title ||
  "Loading Project"}
              </h1>

              <p className="mt-3 max-w-3xl text-zinc-400">

                <div className="mt-6 flex flex-wrap gap-3">

  <div className="rounded-xl bg-zinc-900 px-4 py-2 text-sm">
    Category:
    {" "}
    {project?.category}
  </div>

  <div className="rounded-xl bg-zinc-900 px-4 py-2 text-sm">
    Difficulty:
    {" "}
    {project?.difficulty}
  </div>

  <div className="rounded-xl bg-zinc-900 px-4 py-2 text-sm">
    Tech:
    {" "}
    {project?.tech}
  </div>

</div>
                {project?.description ||
  "Loading description..."}
              </p>

            </div>

            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
             {project?.status ||
  "Active"}
            </div>

          </div>

        </div>

      </div>

     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm text-zinc-500">
            Team Members
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {stats.members}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm text-zinc-500">
            Resources
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {stats.resources}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm text-zinc-500">
            Questions
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {stats.questions}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm text-zinc-500">
            Discussions
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {stats.discussions}
          </h2>
        </div>

      </div>

     <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

   <div className="xl:col-span-2 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

  <button
    onClick={() =>
      setShowActivity(
        !showActivity
      )
    }
    className="mb-6 flex w-full items-center justify-between rounded-2xl bg-zinc-900 p-4 text-left"
  >
    <div>

      <h2 className="text-2xl font-bold">
        Recent Activity
      </h2>

      <p className="text-sm text-zinc-500">
        Latest workspace updates
      </p>

    </div>

    <span className="text-3xl">
      {showActivity
        ? "−"
        : "+"}
    </span>

  </button>

  {showActivity && (

   <div className="space-y-3">

  {activities.length === 0 && (

    <div className="rounded-2xl bg-zinc-900 p-4 text-zinc-500">
      No activity yet
    </div>

  )}

  {activities.map(
    (
      activity,
      index
    ) => (

      <div
        key={index}
        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
      >

        <div className="font-medium">

          {activity.type ===
            "resource" &&
            `New resource: ${activity.title}`}

          {activity.type ===
            "question" &&
            `${activity.user} asked a question`}

          {activity.type ===
            "discussion" &&
            `${activity.user} started a discussion`}

          {activity.type ===
            "announcement" &&
            `Announcement: ${activity.title}`}

        </div>

      </div>

    )
  )}

</div>

  )}

</div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

          <button
  onClick={() =>
    setShowHealth(
      !showHealth
    )
  }
  className="mb-6 flex w-full items-center justify-between rounded-2xl bg-zinc-900 p-4 text-left"
>
  <div>

    <h2 className="text-2xl font-bold">
      Workspace Status
    </h2>

    <p className="text-sm text-zinc-500">
      Health and progress
    </p>

  </div>

  <span className="text-3xl">
    {showHealth
      ? "−"
      : "+"}
  </span>

</button>

         {showHealth && (

  <div className="space-y-4">

    <div className="rounded-2xl bg-zinc-900 p-4">
      Project Health

      <div className="mt-2 text-2xl font-bold">
        100%
      </div>

    </div>

    <div className="rounded-2xl bg-zinc-900 p-4">
      Completion

      <div className="mt-2 text-2xl font-bold">
        0%
      </div>

    </div>

    <div className="rounded-2xl bg-zinc-900 p-4">
      Workspace State

      <div className="mt-2 text-lg font-semibold text-green-500">
        Active
      </div>

    </div>

  </div>

)}

        </div>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

       <button
  onClick={() =>
    setShowActions(
      !showActions
    )
  }
  className="mb-6 flex w-full items-center justify-between rounded-2xl bg-zinc-900 p-4 text-left"
>
  <div>

    <h2 className="text-2xl font-bold">
      Workspace Navigation
    </h2>

    <p className="text-sm text-zinc-500">
      Open workspace sections
    </p>

  </div>

  <span className="text-3xl">
    {showActions
      ? "−"
      : "+"}
  </span>

</button>

       {showActions && (

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

    <button
      onClick={() =>
        router.push(
          "../discussions"
        )
      }
      className="rounded-2xl bg-zinc-900 p-5 text-left transition hover:bg-zinc-800"
    >
      <h3 className="font-bold">
        Discussions
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Team conversations and collaboration
      </p>
    </button>

    <button
      onClick={() =>
        router.push(
          "../resources"
        )
      }
      className="rounded-2xl bg-zinc-900 p-5 text-left transition hover:bg-zinc-800"
    >
      <h3 className="font-bold">
        Resources
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Files, links and documentation
      </p>
    </button>

    <button
      onClick={() =>
        router.push(
          "../questions"
        )
      }
      className="rounded-2xl bg-zinc-900 p-5 text-left transition hover:bg-zinc-800"
    >
      <h3 className="font-bold">
        Questions
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Technical questions and answers
      </p>
    </button>

    <button
      onClick={() =>
        router.push(
          "../announcements"
        )
      }
      className="rounded-2xl bg-zinc-900 p-5 text-left transition hover:bg-zinc-800"
    >
      <h3 className="font-bold">
        Announcements
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Official workspace updates
      </p>
    </button>

    <button
      onClick={() =>
        router.push(
          "../members"
        )
      }
      className="rounded-2xl bg-zinc-900 p-5 text-left transition hover:bg-zinc-800"
    >
      <h3 className="font-bold">
        Members
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Team directory and participation
      </p>
    </button>

  </div>

)}

      </div>

    </div>
  );
}
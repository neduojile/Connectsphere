"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Activity,
  FolderKanban,
  Users,
  MessageSquare,
} from "lucide-react";

export default function ActivityWidget() {

  const [activity,
    setActivity] =
    useState<any>(null);

  useEffect(() => {

    async function loadActivity() {

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
          "/api/dashboard/activity",
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

      setActivity(data);

    }

    loadActivity();

  }, []);

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

      <div className="flex items-center gap-3">

        <Activity
          size={24}
          className="text-orange-500"
        />

        <h2 className="text-2xl font-bold">
          Recent Activity
        </h2>

      </div>

      <div className="mt-6 space-y-4">

        {activity?.projects?.map(
          (project: any) => (

            <div
              key={project.id}
              className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4"
            >

              <FolderKanban
                size={18}
                className="text-orange-500"
              />

              <span>
                Project:
                {" "}
                {project.title}
              </span>

            </div>

          )
        )}

        {activity?.communities?.map(
          (membership: any) => (

            <div
              key={membership.id}
              className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4"
            >

              <Users
                size={18}
                className="text-orange-500"
              />

              <span>
                Joined
                {" "}
                {membership.community.name}
              </span>

            </div>

          )
        )}

        {activity?.questions?.map(
          (question: any) => (

            <div
              key={question.id}
              className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4"
            >

              <MessageSquare
                size={18}
                className="text-orange-500"
              />

              <span>
                Asked:
                {" "}
                {question.title}
              </span>

            </div>

          )
        )}

      </div>

    </div>

  );

}
"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useParams } from "next/navigation";
import {
  Megaphone,
  Plus,
  Calendar,
} from "lucide-react";

export default function AnnouncementsPage() {
  const params = useParams();

  const projectId =
    params.id as string;

  const [announcements,
    setAnnouncements] =
    useState<any[]>([]);

  const [title,
    setTitle] =
    useState("");

  const [content,
    setContent] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  const [user,
    setUser] =
    useState<any>(null);

  const [project,
    setProject] =
    useState<any>(null);

  useEffect(() => {
    loadData();

    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

  async function loadData() {
    try {
      const announcementResponse =
        await fetch(
          `/api/projects/announcements?projectId=${projectId}`
        );

      const announcementData =
        await announcementResponse.json();

      setAnnouncements(
        announcementData.announcements || []
      );

      const projectResponse =
        await fetch(
          "/api/projects/list"
        );

      const projectData =
        await projectResponse.json();

      const foundProject =
        projectData.projects.find(
          (p: any) =>
            p.id === projectId
        );

      setProject(
        foundProject
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function createAnnouncement() {
    if (
      !title ||
      !content ||
      !user
    )
      return;

    const response =
      await fetch(
        "/api/projects/announcements",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            projectId,
            userId: user.id,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      setTitle("");
      setContent("");

      loadData();
    } else {
      alert(
        data.error
      );
    }
  }

  const isOwner =
    project &&
    user &&
    project.ownerId ===
      user.id;

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl space-y-8">

        <div className="rounded-3xl border border-orange-500/20 bg-zinc-950 p-6">

          <div className="flex items-center gap-3">

            <Megaphone
              size={36}
              className="text-orange-500"
            />

            <div>

              <h1 className="text-3xl md:text-5xl font-black">
                Announcements
              </h1>

              <p className="text-zinc-500">
                Project updates and important information
              </p>

            </div>

          </div>

        </div>

        {isOwner && (
          <div className="rounded-3xl border border-orange-500/20 bg-zinc-950 p-6">

            <div className="flex items-center gap-3 mb-5">

              <Plus
                className="text-orange-500"
              />

              <h2 className="text-2xl font-bold">
                New Announcement
              </h2>

            </div>

            <div className="space-y-4">

              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="Announcement title"
                className="w-full rounded-xl border border-zinc-700 bg-black p-4"
              />

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                rows={6}
                placeholder="Announcement content..."
                className="w-full rounded-xl border border-zinc-700 bg-black p-4"
              />

              <button
                onClick={
                  createAnnouncement
                }
                className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black"
              >
                Publish Announcement
              </button>

            </div>

          </div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-zinc-950 p-10 text-center">
            Loading announcements...
          </div>
        ) : announcements.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center">

            <Megaphone
              size={70}
              className="mx-auto text-orange-500"
            />

            <h2 className="mt-5 text-3xl font-bold">
              No Announcements Yet
            </h2>

            <p className="mt-3 text-zinc-500">
              Project updates will appear here.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {announcements.map(
              (announcement) => (
                <div
                  key={
                    announcement.id
                  }
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
                >

                  <h2 className="text-2xl font-bold">
                    {
                      announcement.title
                    }
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-zinc-500">

                    <Calendar
                      size={16}
                    />

                    {new Date(
                      announcement.createdAt
                    ).toLocaleString()}

                  </div>

                  <p className="mt-5 whitespace-pre-line text-zinc-300">
                    {
                      announcement.content
                    }
                  </p>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </AppLayout>
  );
}
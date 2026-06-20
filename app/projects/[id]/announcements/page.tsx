"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useParams } from "next/navigation";

import {
  Megaphone,
  Plus,
  Calendar,
  Search,
  Bell,
  FileText,
} from "lucide-react";

export default function AnnouncementsPage() {
  const params = useParams();

  const projectId =
    params.id as string;

  const [announcements,
    setAnnouncements] =
    useState<any[]>([]);

  const [filtered,
    setFiltered] =
    useState<any[]>([]);

  const [title,
    setTitle] =
    useState("");

  const [content,
    setContent] =
    useState("");

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  const [creating,
    setCreating] =
    useState(false);

  const [user,
    setUser] =
    useState<any>(null);

  const [project,
    setProject] =
    useState<any>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }

    loadData();
  }, []);

  useEffect(() => {
    const result =
      announcements.filter(
        (announcement) =>
          announcement.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          announcement.content
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFiltered(result);
  }, [search, announcements]);

  async function loadData() {
    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/projects/announcements?projectId=${projectId}`
        );

      const data =
        await response.json();

      setAnnouncements(
        data.announcements || []
      );

      setFiltered(
        data.announcements || []
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
      !title.trim() ||
      !content.trim()
    )
      return;

    try {
      setCreating(true);

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
              userId:
                user?.id,
            }),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        setTitle("");
        setContent("");

        await loadData();

        alert(
          "Announcement published successfully"
        );
      } else {
        alert(
          data.error
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  }

  const isOwner =
    project &&
    user &&
    project.ownerId ===
      user.id;

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Hero */}

        <div className="rounded-3xl border border-orange-500/20 bg-zinc-950 p-5 md:p-8">

          <div className="flex items-center gap-4">

            <Megaphone
              size={40}
              className="text-orange-500"
            />

            <div>

              <h1 className="text-3xl md:text-5xl font-black">
                Announcements
              </h1>

              <p className="text-zinc-500">
                Important project updates
              </p>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <Bell className="text-orange-500" />
            <h2 className="mt-3 text-3xl font-black text-orange-500">
              {announcements.length}
            </h2>
            <p>Total Announcements</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <FileText className="text-orange-500" />
            <h2 className="mt-3 text-3xl font-black text-orange-500">
              {
                announcements.filter(
                  (a) =>
                    new Date(
                      a.createdAt
                    ).toDateString() ===
                    new Date().toDateString()
                ).length
              }
            </h2>
            <p>Today's Updates</p>
          </div>

        </div>

        {/* Search */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search announcements..."
              className="w-full rounded-xl border border-zinc-700 bg-black py-3 pl-12 pr-4"
            />

          </div>

        </div>

        {/* Owner Section */}

        {isOwner && (

          <div className="rounded-3xl border border-orange-500/20 bg-zinc-950 p-5 md:p-6">

            <div className="mb-5 flex items-center gap-3">

              <Plus className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Publish Announcement
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
                placeholder="Write announcement..."
                className="w-full rounded-xl border border-zinc-700 bg-black p-4"
              />

              <div className="flex items-center justify-between">

                <span className="text-sm text-zinc-500">
                  {content.length} characters
                </span>

                <button
                  onClick={
                    createAnnouncement
                  }
                  disabled={creating}
                  className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black"
                >
                  {creating
                    ? "Publishing..."
                    : "Publish"}
                </button>

              </div>

            </div>

          </div>

        )}

        {/* Announcements */}

        {loading ? (

          <div className="rounded-3xl bg-zinc-950 p-10 text-center">
            Loading announcements...
          </div>

        ) : filtered.length === 0 ? (

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-12 text-center">

            <Megaphone
              size={70}
              className="mx-auto text-orange-500"
            />

            <h2 className="mt-5 text-3xl font-bold">
              No Announcements Yet
            </h2>

            <p className="mt-3 text-zinc-500">
              Updates from project owners will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {filtered.map(
              (announcement) => (

                <div
                  key={
                    announcement.id
                  }
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-6"
                >

                  <h2 className="text-xl md:text-2xl font-bold">
                    {
                      announcement.title
                    }
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">

                    <Calendar
                      size={15}
                    />

                    {new Date(
                      announcement.createdAt
                    ).toLocaleString()}

                  </div>

                  <div className="mt-5 border-t border-zinc-800 pt-5">

                    <p className="whitespace-pre-wrap text-zinc-300">
                      {
                        announcement.content
                      }
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>
    </AppLayout>
  );
}
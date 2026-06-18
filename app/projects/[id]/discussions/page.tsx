"use client";

import { useState } from "react";

export default function DiscussionsPage() {

  const [discussionTitle,
    setDiscussionTitle] =
    useState("");

  const [discussionContent,
    setDiscussionContent] =
    useState("");

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">
          Discussions
        </h1>

        <p className="mt-2 text-zinc-500">
          Collaborate with your team and
          discuss project progress.
        </p>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        <input
          placeholder="Discussion title"
          value={discussionTitle}
          onChange={(e) =>
            setDiscussionTitle(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
        />

        <textarea
          placeholder="What would you like to discuss?"
          value={discussionContent}
          onChange={(e) =>
            setDiscussionContent(
              e.target.value
            )
          }
          rows={5}
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
        />

        <button
          className="mt-4 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-black"
        >
          Start Discussion
        </button>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        <div className="mb-6 flex flex-col gap-4 lg:flex-row">

          <input
            placeholder="Search discussions..."
            className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
          />

          <select
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <option>
              Newest First
            </option>

            <option>
              Oldest First
            </option>

          </select>

        </div>

        <div className="space-y-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

            <div className="mb-2 flex items-center justify-between">

              <h3 className="font-bold">
                No discussions yet
              </h3>

              <span className="text-sm text-zinc-500">
                Just now
              </span>

            </div>

            <p className="text-zinc-400">
              Create the first discussion
              for this project.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}
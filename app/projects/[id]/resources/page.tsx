"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FolderOpen,
  FileText,
  LinkIcon,
  ImageIcon,
  Video,
  ExternalLink,
  Upload,
  Trash2,
} from "lucide-react";

export default function ResourcesPage() {

  const params = useParams();

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [url, setUrl] =
    useState("");

    const [resourceType,
  setResourceType] =
  useState("Document");

  const [resources,
    setResources] =
    useState<any[]>([]);

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
      JSON.parse(
        storedUser
      )
    );

  }

}, []);


  async function loadResources() {

  const response =
    await fetch(
      `/api/projects/resources/list?projectId=${params.id}`
    );

  const data =
    await response.json();

  setResources(
    data.resources || []
  );

}

async function loadProject() {

  const response =
    await fetch(
      `/api/projects/${params.id}`
    );

  const data =
    await response.json();

  setProject(
    data.project
  );

}

useEffect(() => {

  loadResources();

  loadProject();

}, []);

async function createResource() {

  if (
    !title ||
    !url
  ) {

    alert(
      "Title and URL are required"
    );

    return;

  }

  const response =
    await fetch(
      "/api/projects/resources/create",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          title,
          description,
          url,
          resourceType,
          projectId:
            params.id,
        }),
      }
    );

  if (!response.ok) {

    alert(
      "Failed to upload resource"
    );

    return;

  }

  setTitle("");
  setDescription("");
  setUrl("");

  loadResources();

}

function getIcon(
  resourceUrl: string
) {

  const lower =
    resourceUrl.toLowerCase();

  if (
    lower.includes(".png") ||
    lower.includes(".jpg") ||
    lower.includes(".jpeg") ||
    lower.includes(".webp")
  ) {

    return (
      <ImageIcon
        className="text-green-500"
      />
    );

  }

  if (
    lower.includes("youtube") ||
    lower.includes("loom")
  ) {

    return (
      <Video
        className="text-red-500"
      />
    );

  }

  if (
    lower.includes(".pdf")
  ) {

    return (
      <FileText
        className="text-orange-500"
      />
    );

  }

  return (
    <LinkIcon
      className="text-blue-500"
    />
  );

}

async function deleteResource(
  resourceId: string
) {

  const confirmed =
    confirm(
      "Delete this resource?"
    );

  if (!confirmed)
    return;

  const response =
    await fetch(
      "/api/projects/resources/create",
      {
        method: "DELETE",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          resourceId,
        }),
      }
    );

  if (!response.ok) {

    alert(
      "Failed to delete"
    );

    return;

  }

  loadResources();

}

  return (

    <div className="space-y-8">

      <div>

        <div className="flex items-center gap-3">

          <FolderOpen
            size={34}
            className="text-orange-500"
          />

          <h1 className="text-2xl md:text-4xl font-black">
            Resources
          </h1>

        </div>

        <p className="mt-2 text-zinc-500">
          Documents, links, screenshots,
          repositories and project assets.
        </p>

      </div>

   {user?.id === project?.ownerId && (

  <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

    <input
      value={title}
      onChange={(e) =>
        setTitle(
          e.target.value
        )
      }
      placeholder="Resource Title"
      className="mb-4 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
    />

    <textarea
      value={description}
      onChange={(e) =>
        setDescription(
          e.target.value
        )
      }
      rows={4}
      placeholder="Description"
      className="mb-4 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
    />

    <select
      value={resourceType}
      onChange={(e) =>
        setResourceType(
          e.target.value
        )
      }
      className="mb-4 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
    >
      <option>Document</option>
      <option>Image</option>
      <option>Video</option>
      <option>Repository</option>
      <option>Link</option>
    </select>

    <input
      value={url}
      onChange={(e) =>
        setUrl(
          e.target.value
        )
      }
      placeholder="https://..."
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
    />

    <button
      onClick={
        createResource
      }
      className="mt-4 flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-black"
    >
      <Upload size={18} />
      Upload Resource
    </button>

  </div>

)}

      <div className="grid gap-4">

        {resources.map(
          (resource) => (

            <div
              key={resource.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  {getIcon(
                    resource.url
                  )}

                  <div>

                    <div className="flex items-center gap-3">

  <h3 className="text-lg font-bold">
    {resource.title}
  </h3>

  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-black">

    {resource.resourceType}

  </span>

</div>

                    <p className="mt-2 text-zinc-400">

                      {
                        resource.description
                      }

                    </p>

{resource.resourceType ===
  "Image" && (

  <img
    src={resource.url}
    alt={resource.title}
    className="mt-4 max-h-64 rounded-2xl border border-zinc-800"
  />

)}

                </div>

</div>

<div className="flex gap-2">

  <a
    href={resource.url}
    target="_blank"
    className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2"
  >

    <ExternalLink
      size={16}
    />

    Open

  </a>

  {user?.id ===
    project?.ownerId && (

    <button
      onClick={() =>
        deleteResource(
          resource.id
        )
      }
      className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white"
    >

      <Trash2
        size={16}
      />

      Delete

    </button>

  )}

</div>

</div>

</div>

)

)}

</div>

</div>

);

}
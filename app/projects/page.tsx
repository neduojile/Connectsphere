"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import { useRouter } from "next/navigation";
import {
  FolderKanban,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ProjectsPage() {

const [projects, setProjects] =
  useState<any[]>([]);

const [search, setSearch] =
  useState("");

const [selectedCategory,
  setSelectedCategory] =
  useState("All");

const filteredProjects =
  projects.filter(
    (project) => {
      const matchesSearch =
        project.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        project.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        project.tech
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory ===
          "All" ||
        project.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

 
  
  const [title, setTitle] =
  useState("");



  const router =
  useRouter();

const [description,
  setDescription] =
  useState("");

 

const [category,
  setCategory] =
  useState("");

const [difficulty,
  setDifficulty] =
  useState("");

const [tech, setTech] =
  useState("");

const [loading, setLoading] =
  useState(true);

const [ownedProjects,
  setOwnedProjects] =
  useState<any[]>([]);

const [joinedProjects,
  setJoinedProjects] =
  useState<any[]>([]);

useEffect(() => {
  async function loadProjects() {
    try {
      const response =
        await fetch(
          "/api/projects/list"
        );

      const data =
        await response.json();

      if (data.success) {
        setProjects(
          data.projects
        );

        const storedUser =
  localStorage.getItem(
    "connectsphere_user"
  );

if (storedUser) {
  const user =
    JSON.parse(storedUser);

  const myResponse =
    await fetch(
      "/api/projects/my",
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

  const myData =
    await myResponse.json();

  if (myData.success) {
    setOwnedProjects(
      myData.ownedProjects
    );

    setJoinedProjects(
      myData.joinedProjects
    );
  }
}
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  loadProjects();
}, []);



if (loading) {
  return (
    <AppLayout>
      <div className="p-10">
        Loading Projects...
      </div>
    </AppLayout>
  );
}

async function createProject() {
  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

  const response =
    await fetch(
      "/api/projects/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ownerId: user.id,
          title,
          description,
          category,
          difficulty,
          tech,
        }),
      }
    );

  const data =
    await response.json();

  if (data.success) {
    alert(
      "Project created successfully"
    );

    window.location.reload();
  }
}

async function joinProject(
  projectId: string
) {
  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

  const response =
    await fetch(
      "/api/projects/join",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          projectId,
        }),
      }
    );

  const data =
    await response.json();

  if (data.success) {
    alert(
      "Joined project successfully"
    );

    window.location.reload();
  } else {
    alert(
      data.error
    );
  }
}

async function deleteProject(
  projectId: string
) {

  const confirmed =
    confirm(
      "Delete this project?"
    );

  if (!confirmed)
    return;

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
      "/api/projects/delete",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          projectId,
          userId:
            user.id,
        }),
      }
    );

  const data =
    await response.json();

  if (data.success) {

    setProjects(
      projects.filter(
        (p) =>
          p.id !==
          projectId
      )
    );

    setOwnedProjects(
      ownedProjects.filter(
        (p) =>
          p.id !==
          projectId
      )
    );

    alert(
      "Project deleted"
    );

  } else {

    alert(
      data.error ||
      "Failed to delete project"
    );

  }

}

const activeProjects =
  projects.filter(
    (p) => p.status === "Active"
  ).length;

const completedProjects =
  projects.filter(
    (p) => p.status === "Completed"
  ).length;

const contributors =
  projects.reduce(
    (total, project) =>
      total +
      (project.memberships?.length || 0),
    0
  );


  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl">

        {/* Hero */}

        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-orange-950/20 p-4 md:p-4 md:p-8">

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10">

            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
              Projects Hub
            </p>

          <h1 className="mt-4 text-2xl md:text-5xl font-black">
              Build Together
            </h1>

            <p className="mt-5 max-w-2xl text-muted-foreground">
              Discover projects, find collaborators,
              build your portfolio, and turn ideas
              into real impact.
            </p>

          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-zinc-950 p-4 md:p-6">

  <h2 className="text-2xl font-bold">
    Create Project
  </h2>

  <div className="mt-5 space-y-4">

    <input
      placeholder="Project Title"
      value={title}
      onChange={(e) =>
        setTitle(e.target.value)
      }
      className="w-full rounded-xl border border-zinc-700 bg-card p-4"
    />

    <textarea
      placeholder="Project Description"
      value={description}
      onChange={(e) =>
        setDescription(
          e.target.value
        )
      }
      className="w-full rounded-xl border border-zinc-700 bg-card p-4"
    />

    <input
      placeholder="Category"
      value={category}
      onChange={(e) =>
        setCategory(
          e.target.value
        )
      }
      className="w-full rounded-xl border border-zinc-700 bg-card p-4"
    />

    <select
      value={difficulty}
      onChange={(e) =>
        setDifficulty(
          e.target.value
        )
      }
      className="w-full rounded-xl border border-zinc-700 bg-card p-4"
    >
      <option value="">
        Select Difficulty
      </option>

      <option value="Beginner">
        Beginner
      </option>

      <option value="Intermediate">
        Intermediate
      </option>

      <option value="Advanced">
        Advanced
      </option>
    </select>

    <input
      placeholder="Technology Stack"
      value={tech}
      onChange={(e) =>
        setTech(
          e.target.value
        )
      }
      className="w-full rounded-xl border border-zinc-700 bg-card p-4"
    />

    <button
      onClick={createProject}
      className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black"
    >
      Create Project
    </button>

  </div>

</div>

        {/* Stats */}

<div className="mt-8 grid grid-cols-3 gap-3">

          <div className="rounded-3xl border border-border bg-zinc-950 p-4">
            <h3 className="text-xl md:text-3xl font-black text-orange-500">
             {activeProjects}
            </h3>

            <p className="text-zinc-500">
              Active Projects
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-zinc-950 p-6">
            <h3 className="text-3xl font-black text-orange-500">
            {contributors}
            </h3>

            <p className="text-zinc-500">
              Contributors
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-zinc-950 p-6">
            <h3 className="text-3xl font-black text-orange-500">
          {completedProjects}
            </h3>

            <p className="text-zinc-500">
              Completed Projects
            </p>
          </div>

        </div>

        {/* AI Recommended */}

      <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">

  <div className="flex items-center gap-3">

    <Sparkles
      size={20}
      className="text-orange-500"
    />

    <h2 className="text-xl font-bold">
      AI Recommendations
    </h2>

  </div>

  <p className="mt-2 text-sm text-zinc-400">
    Personalized suggestions based on your profile.
  </p>

  <div className="mt-4 grid gap-3 md:grid-cols-2">

    <div className="rounded-xl bg-zinc-900 p-3">
      <h3 className="font-semibold">
        Blockchain Credential Verification
      </h3>

      <p className="text-sm text-zinc-500">
        Matches Web3 and Identity interests.
      </p>
    </div>

    <div className="rounded-xl bg-zinc-900 p-3">
      <h3 className="font-semibold">
        AI Mentor Platform
      </h3>

      <p className="text-sm text-zinc-500">
        Matches AI and Community Building.
      </p>
    </div>

  </div>

</div>

<div className="mt-8 grid gap-6 lg:grid-cols-2">

  <div className="rounded-3xl border border-border bg-zinc-950 p-6">

    <h2 className="text-2xl font-bold">
      My Projects
    </h2>

    <div className="mt-4 space-y-3">

      {ownedProjects.length >
      0 ? (
        ownedProjects.map(
          (project) => (
            <div
              key={project.id}
              className="rounded-xl bg-zinc-900 p-3"
            >
              {project.title}
            </div>
          )
        )
      ) : (
        <p className="text-zinc-500">
          No projects created.
        </p>
      )}

    </div>

  </div>

  <div className="rounded-3xl border border-border bg-zinc-950 p-6">

    <h2 className="text-2xl font-bold">
      Joined Projects
    </h2>

    <div className="mt-4 space-y-3">

      {joinedProjects.length >
      0 ? (
        joinedProjects.map(
          (membership) => (
            <div
              key={
                membership.id
              }
              className="rounded-xl bg-zinc-900 p-3"
            >
              {
                membership
                  .project
                  .title
              }
            </div>
          )
        )
      ) : (
        <p className="text-zinc-500">
          No joined projects.
        </p>
      )}

    </div>

  </div>

</div>

<div className="mt-8">

  <input
    type="text"
    placeholder="Search projects..."
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4"
  />

  <div className="mt-4 flex flex-wrap gap-3">

    {[
      "All",
      "Web Development",
      "AI",
      "Blockchain",
      "Mobile",
      "Community",
    ].map((category) => (
      <button
        key={category}
        onClick={() =>
          setSelectedCategory(
            category
          )
        }
        className={`rounded-xl px-4 py-2 transition ${
          selectedCategory ===
          category
            ? "bg-orange-500 text-black"
            : "bg-zinc-900 text-white"
        }`}
      >
        {category}
      </button>
    ))}

  </div>

</div>

        {/* Project Cards */}

     <div className="mt-10 grid gap-4 md:grid-cols-2">

        {projects.length > 0 ? (
 filteredProjects.map(
  (project) => (
            <div
              key={project.title}
              className="rounded-3xl border border-border bg-zinc-950 p-6 transition hover:border-orange-500"
            >

              <div className="flex items-center justify-between">

                <FolderKanban
                  className="text-orange-500"
                  size={24}
                />

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-500">
                  Featured
                </span>

              </div>

             <div className="mt-5 flex items-center gap-3">

  <h2 className="text-lg md:text-2xlfont-bold">
    {project.title}
  </h2>

  {ownedProjects.some(
    (p) => p.id === project.id
  ) && (

    <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-black">

      OWNER

    </span>

  )}

</div>

              <p className="mt-2 text-orange-500">
                {project.category}
              </p>

              <p className="mt-3 text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">

                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm text-orange-500">
                  {project.difficulty}
                </span>

                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                  {project.tech}
                </span>

              </div>

              <div className="mt-5 flex items-center gap-5 text-sm text-zinc-500">

                <div className="flex items-center gap-2">
                  <Users size={16} />
                {project.memberships?.length || 0} Members
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                {project.status || "Active"}
                </div>

              </div>

             <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                <button
                 onClick={() =>
  joinProject(
    project.id
  )
}
                  className="rounded-xl border border-orange-500 px-5 py-3 text-orange-500 transition hover:bg-orange-500 hover:text-black"
                >
                  Join Project
                </button>

                <button
                  onClick={() =>
  router.push(
    `/projects/${project.id}`
  )
}
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400"
                >
                  View Project
                  <ArrowRight size={18} />
                </button>

{ownedProjects.some(
  (p) => p.id === project.id
) && (

  <button
    onClick={() =>
      deleteProject(
        project.id
      )
    }
    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
  >

    Delete

  </button>

)}

              </div>

            </div>
        ))
) : (
  <div className="rounded-3xl border border-border bg-zinc-950 p-10 text-center">
    No projects found.
  </div>
)}

        </div>

      </div>
    </AppLayout>
  );
}
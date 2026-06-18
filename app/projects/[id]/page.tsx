"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();

  const [project, setProject] =
    useState<any>(null);

  const [activeTab, setActiveTab] =
    useState("overview");

  const [resources, setResources] =
    useState<any[]>([]);

  const [discussions, setDiscussions] =
    useState<any[]>([]);

  const [questions, setQuestions] =
    useState<any[]>([]);

  const [announcements, setAnnouncements] =
    useState<any[]>([]);

   
const [answers, setAnswers] =
  useState<any[]>([]);

  

const [answerContent,
  setAnswerContent] =
  useState("");

  const [resourceTitle, setResourceTitle] =
    useState("");

  const [
    resourceDescription,
    setResourceDescription,
  ] = useState("");

  const [resourceUrl, setResourceUrl] =
    useState("");

  const [
    discussionMessage,
    setDiscussionMessage,
  ] = useState("");

  const [questionTitle, setQuestionTitle] =
    useState("");

  const [
    questionContent,
    setQuestionContent,
  ] = useState("");

  const [
    announcementTitle,
    setAnnouncementTitle,
  ] = useState("");

  const [
    announcementContent,
    setAnnouncementContent,
  ] = useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [tech, setTech] =
    useState("");

  const [isOwner, setIsOwner] =
    useState(false);

  useEffect(() => {
    async function loadProject() {
      const response =
        await fetch(
          `/api/projects/${params.id}`
        );

      const data =
        await response.json();

      if (!data.project) return;

      setProject(data.project);

      setTitle(data.project.title);
      setDescription(
        data.project.description
      );
      setCategory(
        data.project.category
      );
      setDifficulty(
        data.project.difficulty
      );
      setTech(
        data.project.tech
      );

      const resourcesResponse =
        await fetch(
          `/api/projects/resources?projectId=${params.id}`
        );

      const resourcesData =
        await resourcesResponse.json();

      setResources(
        resourcesData.resources || []
      );

      const discussionsResponse =
        await fetch(
          `/api/projects/discussions?projectId=${params.id}`
        );

      const discussionsData =
        await discussionsResponse.json();

      setDiscussions(
        discussionsData.discussions || []
      );

      const questionsResponse =
        await fetch(
          `/api/projects/questions?projectId=${params.id}`
        );

      const questionsData =
        await questionsResponse.json();

      setQuestions(
        questionsData.questions || []
      );

      const allAnswers = [];

for (
  const question of
  questionsData.questions || []
) {
  const answerResponse =
    await fetch(
      `/api/projects/answers?questionId=${question.id}`
    );

  const answerData =
    await answerResponse.json();

  allAnswers.push({
    questionId:
      question.id,
    answers:
      answerData.answers || [],
  });
}

setAnswers(allAnswers);

      const announcementsResponse =
        await fetch(
          `/api/projects/announcements?projectId=${params.id}`
        );

      const announcementsData =
        await announcementsResponse.json();

      setAnnouncements(
        announcementsData.announcements ||
          []
      );

      const answersResponse =
  await fetch(
    `/api/projects/answers/all?projectId=${params.id}`
  );

const answersData =
  await answersResponse.json();

setAnswers(
  answersData.questions || []
);

      const storedUser =
        localStorage.getItem(
          "connectsphere_user"
        );

      if (storedUser) {
        const user =
          JSON.parse(storedUser);

        setIsOwner(
          user.id ===
            data.project.ownerId
        );
      }
    }

    loadProject();
  }, [params.id]);

  if (!project) {
    return (
      <AppLayout>
        <div className="p-10">
          Loading project...
        </div>
      </AppLayout>
    );
  }

  async function deleteProject() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

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
            projectId: project.id,
            userId: user.id,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      router.push("/projects");
    }
  }

  async function leaveProject() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

    const response =
      await fetch(
        "/api/projects/leave",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            projectId: project.id,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      router.push("/projects");
    }
  }

  async function updateProject() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

    const response =
      await fetch(
        "/api/projects/update",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            projectId: project.id,
            userId: user.id,
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
      setProject(data.project);
      alert(
        "Project updated successfully"
      );
    }
  }

  async function createResource() {
    if (!project) return;

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
            title: resourceTitle,
            description:
              resourceDescription,
            url: resourceUrl,
            projectId:
              project.id,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      setResources([
        data.resource,
        ...resources,
      ]);

      setResourceTitle("");
      setResourceDescription("");
      setResourceUrl("");

      alert("Resource added");
    }
  }

  async function addAnnouncement() {
    if (!project) return;

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
            title:
              announcementTitle,
            content:
              announcementContent,
            projectId:
              project.id,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      window.location.reload();
    }
  }

  async function addDiscussion() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

    const response =
      await fetch(
        "/api/projects/discussions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message:
              discussionMessage,
            userId: user.id,
            projectId:
              project.id,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      window.location.reload();
    }
  }

  async function addQuestion() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

    const response =
      await fetch(
        "/api/projects/questions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title:
              questionTitle,
            content:
              questionContent,
            userId: user.id,
            projectId:
              project.id,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      window.location.reload();
    }
  }


  
async function addAnswer(
  questionId: string
) {
  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (!storedUser)
    return;

  const user =
    JSON.parse(storedUser);

  const response =
    await fetch(
      "/api/projects/answers",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          content:
            answerContent,
          questionId,
          userId:
            user.id,
        }),
      }
    );

  const data =
    await response.json();

  if (data.success) {
    window.location.reload();
  }
}

  return (
  <AppLayout>

    <div className="mx-auto max-w-5xl">
      <div className="rounded-3xl border border-border bg-zinc-950 p-8">

        <h1 className="text-4xl font-black">
          {project.title}
        </h1>

        <p className="mt-4 text-zinc-400">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-orange-500/10 px-4 py-2 text-orange-500">
            {project.category}
          </span>

          <span className="rounded-full bg-zinc-800 px-4 py-2">
            {project.tech}
          </span>

          <span className="rounded-full bg-green-500/10 px-4 py-2 text-green-500">
            {project.status}
          </span>
        </div>

       <div className="grid grid-cols-12 gap-6 mt-8">
</div>
  <div className="col-span-3">

    <div className="rounded-2xl bg-zinc-900 p-4">

      <p className="mb-4 text-xs uppercase text-zinc-500">
        Workspace
      </p>

      {[
        {
          id: "overview",
          label: "📊 Overview",
        },
        {
          id: "resources",
          label: "📚 Resources",
        },
        {
          id: "discussions",
          label: "💬 Discussions",
        },
        {
          id: "qa",
          label: "❓ Q&A",
        },
        {
          id: "announcements",
          label: "📢 Announcements",
        },
        {
          id: "members",
          label: "👥 Members",
        },
      ].map((tab) => (

        <button
          key={tab.id}
          onClick={() =>
            setActiveTab(tab.id)
          }
          className={`mb-2 w-full rounded-xl px-4 py-3 text-left transition ${
            activeTab === tab.id
              ? "bg-orange-500 text-black"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          {tab.label}
        </button>

      ))}

    </div>

  </div>

  <div className="col-span-9">
  

        {activeTab === "overview" && (
          <div className="mt-8 space-y-3">
            <p>
              <strong>Difficulty:</strong>{" "}
              {project.difficulty}
            </p>

            <p>
              <strong>Members:</strong>{" "}
              {project.memberships?.length}
            </p>

            <p>
              <strong>Owner:</strong>{" "}
              {project.owner?.fullName}
            </p>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="mt-8">

            {isOwner && (
              <div className="mb-6 space-y-3">

                <input
                  placeholder="Resource Title"
                  value={resourceTitle}
                  onChange={(e) =>
                    setResourceTitle(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
                />

                <textarea
                  placeholder="Description"
                  value={resourceDescription}
                  onChange={(e) =>
                    setResourceDescription(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
                />

                <input
                  placeholder="Resource URL"
                  value={resourceUrl}
                  onChange={(e) =>
                    setResourceUrl(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
                />

                <button
                  onClick={
                    createResource
                  }
                  className="rounded-xl bg-orange-500 px-5 py-3 text-black"
                >
                  Add Resource
                </button>

              </div>
            )}

            <div className="space-y-4">
              {resources.map(
                (resource) => (
                  <div
                    key={resource.id}
                    className="rounded-xl bg-zinc-900 p-4"
                  >
                    <h3 className="font-bold">
                      {resource.title}
                    </h3>

                    <p className="mt-2 text-zinc-400">
                      {
                        resource.description
                      }
                    </p>

                    <a
                      href={
                        resource.url
                      }
                      target="_blank"
                    >
                      Open Resource
                    </a>
                  </div>
                )
              )}
            </div>

          </div>
        )}

        {activeTab === "discussions" && (
          <div className="mt-8">

            <textarea
              placeholder="Start discussion..."
              value={
                discussionMessage
              }
              onChange={(e) =>
                setDiscussionMessage(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
            />

            <button
              onClick={
                addDiscussion
              }
              className="mt-3 rounded-xl bg-orange-500 px-5 py-3 text-black"
            >
              Post Discussion
            </button>

            <div className="mt-6 space-y-3">
              {discussions.map(
                (discussion) => (
                  <div
                    key={
                      discussion.id
                    }
                    className="rounded-xl bg-zinc-900 p-4"
                  >
                    <p className="font-bold">
                      {
                        discussion.user
                          ?.fullName
                      }
                    </p>

                    <p>
                      {
                        discussion.message
                      }
                    </p>
                  </div>
                )
              )}
            </div>

          </div>
        )}

        {activeTab === "qa" && (
          <div className="mt-8">

            <input
              placeholder="Question Title"
              value={
                questionTitle
              }
              onChange={(e) =>
                setQuestionTitle(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
            />

            <textarea
              placeholder="Question Details"
              value={
                questionContent
              }
              onChange={(e) =>
                setQuestionContent(
                  e.target.value
                )
              }
              className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
            />

            <button
              onClick={
                addQuestion
              }
              className="mt-3 rounded-xl bg-orange-500 px-5 py-3 text-black"
            >
              Ask Question
            </button>

            <div className="mt-6 space-y-3">
              {questions.map(
                (question) => (
                  <div
                    key={
                      question.id
                    }
                    className="rounded-xl bg-zinc-900 p-4"
                  >
                    <h3 className="font-bold">
                      {
                        question.title
                      }
                    </h3>

                    <p>
                      {
                        question.content
                      }
                    </p>
                  </div>
                )
              )}
            </div>

          </div>
        )}

        {activeTab === "announcements" && (
          <div className="mt-8">

            {isOwner && (
              <div className="mb-6 space-y-3">

                <input
                  placeholder="Announcement Title"
                  value={
                    announcementTitle
                  }
                  onChange={(e) =>
                    setAnnouncementTitle(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
                />

                <textarea
                  placeholder="Announcement Content"
                  value={
                    announcementContent
                  }
                  onChange={(e) =>
                    setAnnouncementContent(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
                />

                <button
                  onClick={
                    addAnnouncement
                  }
                  className="rounded-xl bg-orange-500 px-5 py-3 text-black"
                >
                  Publish Announcement
                </button>

              </div>
            )}

            <div className="space-y-3">
              {announcements.map(
                (announcement) => (
                  <div
                    key={
                      announcement.id
                    }
                    className="rounded-xl bg-zinc-900 p-4"
                  >
                    <h3 className="font-bold">
                      {
                        announcement.title
                      }
                    </h3>

                    <p>
                      {
                        announcement.content
                      }
                    </p>
                  </div>
                )
              )}
            </div>

          </div>
        )}

        {activeTab ===
  "qa" && (
  <div className="mt-8">

    <div className="mb-6 space-y-3">

      <input
        placeholder="Question Title"
        value={questionTitle}
        onChange={(e) =>
          setQuestionTitle(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
      />

      <textarea
        placeholder="Question Details"
        value={
          questionContent
        }
        onChange={(e) =>
          setQuestionContent(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
      />

      <button
        onClick={
          addQuestion
        }
        className="rounded-xl bg-orange-500 px-5 py-3 text-black"
      >
        Ask Question
      </button>

    </div>

    <div className="space-y-6">

      {questions.map(
        (question: any) => {

          const questionAnswers =
            answers.find(
              (a: any) =>
                a.questionId ===
                question.id
            )?.answers || [];

          return (
            <div
              key={
                question.id
              }
              className="rounded-xl bg-zinc-900 p-4"
            >

              <h3 className="font-bold text-lg">
                {question.title}
              </h3>

              <p className="mt-2">
                {question.content}
              </p>

              <div className="mt-4 space-y-2">

                {questionAnswers.map(
                  (answer: any) => (
                    <div
                      key={
                        answer.id
                      }
                      className="rounded-lg bg-zinc-800 p-3"
                    >
                      <p className="font-semibold">
                        {
                          answer
                            .user
                            ?.fullName
                        }
                      </p>

                      <p>
                        {
                          answer.content
                        }
                      </p>
                    </div>
                  )
                )}

              </div>

              <textarea
                placeholder="Write an answer..."
                value={
                  answerContent
                }
                onChange={(e) =>
                  setAnswerContent(
                    e.target.value
                  )
                }
                className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
              />

              <button
                onClick={() =>
                  addAnswer(
                    question.id
                  )
                }
                className="mt-3 rounded-xl bg-orange-500 px-4 py-2 text-black"
              >
                Reply
              </button>

            </div>
          );
        }
      )}

    </div>

  </div>
)}

        {activeTab === "members" && (
          <div className="mt-8 space-y-3">
            {project.memberships?.map(
              (member: any) => (
                <div
                  key={member.id}
                  className="rounded-xl bg-zinc-900 p-3"
                >
                  {member.userId}
                </div>
              )
            )}
          </div>
        )}

        {isOwner && (
          <div className="mt-8 flex gap-3">

            <button
              onClick={
                updateProject
              }
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black"
            >
              Save Changes
            </button>

            <button
              onClick={
                deleteProject
              }
              className="rounded-xl border border-red-500 px-6 py-3 text-red-500"
            >
              Delete Project
            </button>

          </div>
        )}

        <div className="mt-4">
          <button
            onClick={
              leaveProject
            }
            className="rounded-xl border border-orange-500 px-6 py-3 text-orange-500"
          >
            Leave Project
          </button>
        </div>

      </div>
    </div>
    </div>
  </AppLayout>
);
}
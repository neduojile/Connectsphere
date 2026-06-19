"use client";
import {
  MessageSquare,
  Send,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

export default function QuestionsPage() {

  const params =
    useParams();

  const [title,
    setTitle] =
    useState("");

  const [content,
    setContent] =
    useState("");

  const [questions,
    setQuestions] =
    useState<any[]>([]);

    const [answerText,
  setAnswerText] =
  useState<Record<string, string>>({});

  async function loadQuestions() {

    const response =
      await fetch(
        `/api/projects/questions?projectId=${params.id}`
      );

    const data =
      await response.json();

    setQuestions(
      data.questions || []
    );

  }

  useEffect(() => {

  loadQuestions();

  const interval =
    setInterval(
      loadQuestions,
      5000
    );

  return () =>
    clearInterval(
      interval
    );

}, []);

  async function createQuestion() {

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
        "/api/projects/questions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            content,
            userId:
              user.id,
            projectId:
              params.id,
          }),
        }
      );

    if (!response.ok) {

      alert(
        "Failed to ask question"
      );

      return;

    }

    setTitle("");
    setContent("");

    loadQuestions();

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
    JSON.parse(
      storedUser
    );
if (
  !answerText[
    questionId
  ]?.trim()
) {
  return;
} 
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
            answerText[
              questionId
            ],
          userId:
            user.id,
          questionId,
        }),
      }
    );

  if (!response.ok)
    return;

  setAnswerText(
    (prev) => ({
      ...prev,
      [questionId]: "",
    })
  );

  loadQuestions();

}


async function deleteAnswer(
  answerId: string
) {

  const response =
    await fetch(
      "/api/projects/answers",
      {
        method: "DELETE",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          answerId,
        }),
      }
    );

  if (response.ok) {

    loadQuestions();

  }

}
  return (

    <div className="space-y-8">

      <div className="flex items-center gap-3">

        <MessageSquare
          size={34}
          className="text-orange-500"
        />

        <div>

          <h1 className="text-4xl font-black">
            Questions & Answers
          </h1>

          <p className="text-zinc-500">
            Ask questions and get help from your team.
          </p>

        </div>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          placeholder="Question Title"
          className="mb-4 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
        />

        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          rows={5}
          placeholder="Describe your question..."
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
        />

        <button
          onClick={
            createQuestion
          }
          className="mt-4 flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-black"
        >

          <Send size={18} />

          Ask Question

        </button>

      </div>

      <div className="space-y-4">

        {questions.map(
          (question) => (

            <div
              key={question.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
            >

             <div className="flex items-start gap-4">

  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-bold text-black">

    {question.user?.fullName?.charAt(0)}

  </div>

  <div className="flex-1">

 <h3 className="text-2xl font-black text-white">

      {question.title}

    </h3>

  <div className="mt-1 flex items-center gap-2">

  <p className="text-sm text-orange-500">

    {question.user?.fullName}

  </p>

  {question.userId ===
    question.project?.ownerId && (

    <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-black">

      OWNER

    </span>

  )}

</div>

    <p className="mt-3 text-zinc-400">

      {question.content}

      <p className="mt-3 text-sm text-orange-500">

  {question.answers?.length || 0}
  {" "}
  Replies

</p>

    </p>

    <div className="mt-5 rounded-2xl bg-zinc-900 p-4">

      <p className="mb-4 text-sm font-semibold text-zinc-500">

        {question.answers?.length || 0}
        {" "}
        Answers

      </p>

      <div className="space-y-3">

        {question.answers?.map(
          (answer: any) => (

            <div
              key={answer.id}
              className="rounded-xl bg-zinc-800 p-4"
            >

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-black">

                  {answer.user?.fullName?.charAt(0)}

                </div>

              <div className="flex w-full items-center justify-between">

  <span className="font-semibold">

    {answer.user?.fullName}

  </span>

  <button
    onClick={() =>
      deleteAnswer(
        answer.id
      )
    }
    className="text-red-500"
  >

    <Trash2
      size={16}
    />

  </button>

</div>
              </div>

              <p className="mt-3 text-zinc-300">

                {answer.content}

              </p>

            </div>

          )
        )}

      </div>

      <textarea
        value={
          answerText[
            question.id
          ] || ""
        }
        onChange={(e) =>
          setAnswerText(
            (prev) => ({
              ...prev,
              [question.id]:
                e.target.value,
            })
          )
        }
        placeholder="Write an answer..."
        rows={3}
        className="mt-4 w-full rounded-2xl border border-zinc-700 bg-black p-3"
      />

      <button
        onClick={() =>
          addAnswer(
            question.id
          )
        }
        className="mt-3 rounded-xl bg-orange-500 px-5 py-2 font-semibold text-black"
      >

        Reply

      </button>

    </div>

  </div>

</div>

            </div>

          )
        )}

      </div>

    </div>

  );

}
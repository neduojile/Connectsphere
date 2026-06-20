"use client";
import { useParams } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import {
  useEffect,
  useState,
  useRef,
} from "react";

export default function ChatPage() {

    const params = useParams();
    const bottomRef =
  useRef<HTMLDivElement>(
    null
  );

const [messages, setMessages] =
  useState<any[]>([]);
  


  const [lastMessageCount,
  setLastMessageCount] =
  useState(0);

  const [sending, setSending] =
  useState(false);

  const [project, setProject] =
  useState<any>(null);

const [memberCount,
  setMemberCount] =
  useState(0);

  const [messageCount,
  setMessageCount] =
  useState(0);

const [message, setMessage] =
  useState("");

const inputRef =
  useRef<HTMLInputElement>(null);

type UserType = {
  id: string;
  fullName: string;
};

const [user, setUser] =
  useState<UserType | null>(
    null
  );

  const [projectOwnerId,
  setProjectOwnerId] =
  useState("");

  useEffect(() => {

  console.log(
    "CHAT USER:",
    user
  );

}, [user]);


useEffect(() => {

  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  console.log(
    "STORED USER:",
    storedUser
  );

  if (storedUser) {

    const parsedUser =
      JSON.parse(
        storedUser
      );

    setUser({
      id: parsedUser.id,
      fullName:
        parsedUser.fullName,
    });

  }

}, []);

useEffect(() => {

  if (
    messages.length >
    lastMessageCount
  ) {

    bottomRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setLastMessageCount(
      messages.length
    );

  }

}, [
  messages,
  lastMessageCount,
]);

useEffect(() => {

  loadMessages();

  loadProject();

  const interval =
  setInterval(
    loadMessages,
    5000
  );

  return () =>
    clearInterval(
      interval
    );
}, [params.id]);

async function loadMessages() {

  try {

    const response =
      await fetch(
        `/api/projects/messages?projectId=${params.id}`
      );

    const data =
      await response.json();

   setMessages(
  data.messages || []
);

setProject(
  data.project
);

setMemberCount(
  data.memberCount || 0
);

setMessageCount(
  data.messageCount || 0
);

  } catch (error) {

    console.error(
      error
    );

  }
}

async function loadProject() {
  try {
    const response =
      await fetch(
        `/api/projects/${params.id}`
      );

    const data =
      await response.json();

    setProjectOwnerId(
      data?.project?.ownerId || ""
    );
  } catch (error) {
    console.error(error);
  }
}


async function sendMessage() {

  if (sending) return;

  setSending(true);

  if (!user) {
  setSending(false);
  return;
}

if (!message.trim()) {
  setSending(false);
  return;
}

  const response =
    await fetch(
      "/api/projects/messages",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          content: message,
          userId: user.id,
          projectId: params.id,
        }),
      }
    );

  if (!response.ok) {
    setSending(false);
    console.error(
      "Failed to send message"
    );
    return;
  }

 setMessage("");

inputRef.current?.focus();

await loadMessages();

setSending(false);
}



  return (
  <AppLayout>
    <div className="flex h-[calc(100vh-120px)] flex-col">

   <div className="border-b border-zinc-800 p-5 flex items-center justify-between">

  <div>

    <h1 className="text-3xl font-black">
      {project?.title || "Loading..."}
    </h1>

    <p className="text-zinc-500">
      Team Communication Channel
    </p>

  </div>

  <div className="rounded-2xl bg-zinc-900 px-4 py-2">

   <div className="flex gap-4 text-sm text-zinc-400">

  <span>
    {memberCount} Members
  </span>

  <span>
    {messageCount} Messages
  </span>

</div>

  </div>

</div>

      <div className="flex-1 overflow-y-auto p-5">

        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">

  <h2 className="text-2xl font-black">
    Project Workspace
  </h2>

  <p className="mt-2 text-zinc-400">
    Team communication channel.
    Discuss tasks, updates,
    blockers and collaboration.
  </p>

</div>

        <div className="rounded-2xl bg-zinc-900 p-4">
  <div className="space-y-5">

  {messages.length === 0 && (

    <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center">

      <h3 className="text-xl font-bold">
        No messages yet
      </h3>

      <p className="mt-2 text-zinc-500">
        Start the conversation.
      </p>

    </div>

  )}

{messages.map((msg) => {

  const isMine =
    user?.id === msg.userId;

  return (

 <div
  key={msg.id}
  className={`flex max-w-[90%] md:max-w-[75%] gap-3 ${
    isMine
      ? "ml-auto flex-row-reverse"
      : ""
  }`}
>
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-black">

    {msg.user?.fullName?.charAt(0) || "U"}

  </div>

  <div>

    <div
      className={`mb-1 flex items-center gap-2 ${
        isMine
          ? "justify-end"
          : ""
      }`}
    >

      <span className="font-semibold">
        {msg.user?.fullName}
      </span>

   {msg.userId === projectOwnerId && (
        <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-black">
          OWNER
        </span>
      )}

      <span className="text-xs text-zinc-500">
        {new Date(
          msg.createdAt
        ).toLocaleString()}
      </span>

    </div>

    <div
      className={`rounded-2xl px-4 py-3 ${
        isMine
          ? "bg-orange-500 text-black"
          : "bg-zinc-800 text-white"
      }`}
    >

      {msg.content}

    </div>

  </div>

</div>

  );

})}

</div>
<div ref={bottomRef} />

        </div>
      </div>

      <div className="border-t border-zinc-800 p-4">
        <div className="flex flex-col gap-3 sm:flex-row">

      <input
  ref={inputRef}
  value={message}
  onChange={(e) =>
    setMessage(
      e.target.value
    )
  }
  onKeyDown={(e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
}}
            placeholder="Type a message..."
          className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none"
          />

     <button
  onClick={sendMessage}
  disabled={sending}
  className="rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-black disabled:opacity-50"
>
  {sending
    ? "Sending..."
    : "Send"}
</button>

        </div>
      </div>

      </div>
  </AppLayout>
  );
}
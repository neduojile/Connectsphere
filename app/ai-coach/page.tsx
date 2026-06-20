"use client";
import {
  saveMessages,
  getMessages,
  clearMessages,
} from "@/lib/chatStorage";
import {
  useState,
  useEffect,
} from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useRef } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  Target,
  Users,
  FolderKanban,
  Briefcase,
  Trash2,
} from "lucide-react";

export default function AICoachPage() {
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] =
    useState(false);

const [messages, setMessages] =
  useState<
    {
      role: string;
      content: string;
    }[]
  >(() => {
    const saved =
      getMessages();

    return saved.length
      ? saved
      : [
          {
            role: "assistant",
            content:
              "Welcome to ConnectSphere AI Coach. I can help you discover opportunities, communities, projects, mentors, leadership skills, and career roadmaps.",
          },
        ];
  });

  useEffect(() => {
  saveMessages(messages);
}, [messages]);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage = message;

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
  message: currentMessage,
  history: messages,
}),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "AI service temporarily unavailable.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to connect to AI service.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl">

        <div className="rounded-3xl border border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-orange-950/20 p-4 md:p-4 md:p-8">

          <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-orange-500/10 p-4 shadow-[0_0_30px_rgba(249,115,22,0.25)]">
              <Bot
                size={36}
                className="text-orange-500"
              />
            </div>

            <div>
             <h1 className="bg-gradient-to-r from-white via-white to-orange-500 bg-clip-text text-2xl md:text-4xl font-black text-transparent">
  AI Growth Coach
</h1>

              <p className="text-muted-foreground">
                Career guidance, mentorship,
                opportunities and growth advice.
              </p>

              <div className="mt-3 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                <span className="text-sm text-green-500">
                  AI Coach Online
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          <button
            onClick={() =>
              setMessage(
                "How do I become a cybersecurity engineer?"
              )
            }
            className="rounded-3xl border border-border bg-zinc-950 p-5 text-left transition hover:border-orange-500"
          >
            <Target className="mb-3 text-orange-500" />

            <h3 className="font-bold">
              Cybersecurity Roadmap
            </h3>
          </button>

          <button
            onClick={() =>
              setMessage(
                "What communities should I join?"
              )
            }
            className="rounded-3xl border border-border bg-zinc-950 p-5 text-left transition hover:border-orange-500"
          >
            <Users className="mb-3 text-orange-500" />

            <h3 className="font-bold">
              Communities
            </h3>
          </button>

          <button
            onClick={() =>
              setMessage(
                "Suggest some projects"
              )
            }
            className="rounded-3xl border border-border bg-zinc-950 p-5 text-left transition hover:border-orange-500"
          >
            <FolderKanban className="mb-3 text-orange-500" />

            <h3 className="font-bold">
              Projects
            </h3>
          </button>

          <button
            onClick={() =>
              setMessage(
                "Show me opportunities"
              )
            }
            className="rounded-3xl border border-border bg-zinc-950 p-5 text-left transition hover:border-orange-500"
          >
            <Briefcase className="mb-3 text-orange-500" />

            <h3 className="font-bold">
              Opportunities
            </h3>
          </button>

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-1 md:grid-cols-3">

          <div className="rounded-3xl border border-border bg-zinc-950 p-5">
            <Sparkles className="mb-3 text-orange-500" />

            <h3 className="font-bold">
              Recommended Community
            </h3>

            <p className="mt-2 text-zinc-500">
              Technology Hub
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-zinc-950 p-5">
            <FolderKanban className="mb-3 text-orange-500" />

            <h3 className="font-bold">
              Recommended Project
            </h3>

            <p className="mt-2 text-zinc-500">
              AI Mentor Assistant
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-zinc-950 p-5">
            <Briefcase className="mb-3 text-orange-500" />

            <h3 className="font-bold">
              Recommended Opportunity
            </h3>

            <p className="mt-2 text-zinc-500">
              Frontend Internship
            </p>
          </div>

        </div>

     <div className="rounded-3xl border border-border bg-zinc-950 p-6">

  <div className="mb-4 flex items-center justify-between">

   <div className="flex items-center gap-3">

  <div className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
    {messages.length} Messages
  </div>

  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

</div>

    <button
      onClick={() => {
        const starterChat = [
          {
            role: "assistant",
            content:
              "Welcome back! How can I help you today?",
          },
        ];

        setMessages(starterChat);

        saveMessages(starterChat);
      }}
      className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:border-red-500 hover:bg-red-500/10"
    >
      <Trash2 size={16} />
      Clear Chat
    </button>

  </div>

  <div className="no-scrollbar h-[550px] space-y-5 overflow-y-auto rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black p-6 shadow-inner shadow-black/40">

 <AnimatePresence>

  {messages.map((msg, index) => (

    <motion.div
      key={index}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`flex ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >

      {msg.role === "assistant" ? (

        <div className="flex max-w-[90%] gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10">

            <Bot
              size={18}
              className="text-orange-500"
            />

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur shadow-lg">

            <div className="mb-2 flex items-center gap-2">

              <span className="text-xs font-bold text-orange-500">
                ConnectSphere AI
              </span>

              <div className="h-1 w-1 rounded-full bg-zinc-600" />

              <span className="text-xs text-zinc-500">
                Mentor
              </span>

            </div>

            {msg.content}

          </div>

        </div>

      ) : (

        <div className="max-w-[85%] rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-4 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)]">

          {msg.content}

          <div className="mt-2 text-right text-[10px] text-black/70">
            You
          </div>

        </div>

      )}

    </motion.div>

  ))}

</AnimatePresence>

    {loading && (
  <div className="flex max-w-[90%] gap-3">

    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10">

      <Bot
        size={18}
        className="animate-pulse text-orange-500"
      />

    </div>

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur shadow-lg">

      <p className="mb-3 text-sm text-zinc-400">
        ConnectSphere AI is thinking...
      </p>

      <div className="flex items-center gap-2">

        <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500" />

        <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:0.15s]" />

        <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:0.3s]" />

      </div>

    </div>

  </div>
)}
<div ref={messagesEndRef} />
  </div>

  <div className="mt-6 flex gap-3">

    <input
      value={message}
      onChange={(e) =>
        setMessage(e.target.value)
      }
      onKeyDown={(e) => {
        if (
          e.key === "Enter" &&
          !loading
        ) {
          handleSend();
        }
      }}
      placeholder="Ask your AI coach..."
      className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-950/70 p-4 backdrop-blur outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
    />

       <button
      onClick={handleSend}
      disabled={loading}
     className="rounded-2xl bg-orange-500 px-6 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-105 hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] disabled:opacity-50">
      <Send size={18} />
    </button>

  </div>

</div>

</div>

</AppLayout>
);
}
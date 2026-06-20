"use client";

import { useState, useEffect } from "react";
import {
  saveMessages,
  getMessages,
  clearMessages,
} from "@/lib/chatStorage";

import { usePathname } from "next/navigation";

import {
  Bot,
  X,
  Send,
  Trash2,
} from "lucide-react";

export default function FloatingAI() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

const [isOnboardingOpen, setIsOnboardingOpen] =
  useState(false);

useEffect(() => {
  const checkOnboarding = () => {
    setIsOnboardingOpen(
      !!document.querySelector(
        "[data-onboarding='true']"
      )
    );
  };

  checkOnboarding();

  const interval =
    setInterval(
      checkOnboarding,
      500
    );

  return () =>
    clearInterval(interval);
}, []);  

 if (
  pathname === "/ai-coach" ||
  pathname === "/login" ||
  pathname === "/register" ||
  isOnboardingOpen
) {
  return null;
}

  const [loading, setLoading] =
  useState(false);

  const [message, setMessage] =
    useState("");

const [messages, setMessages] = useState<
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
              "Hi! I'm your ConnectSphere AI Assistant.",
          },
        ];
  });


  useEffect(() => {
  saveMessages(messages);
}, [messages]);

async function handleSend() {
  if (!message.trim()) return;

  setLoading(true);

  const currentMessage = message;

  const updatedMessages = [
    ...messages,
    {
      role: "user",
      content: currentMessage,
    },
  ];

  setMessages(updatedMessages);

  setMessage("");

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
          history: updatedMessages,
        }),
      }
    );

    const data =
      await response.json();

    const finalMessages = [
      ...updatedMessages,
      {
        role: "assistant",
        content: data.success
          ? data.reply
          : "AI service temporarily unavailable.",
      },
    ];

    setMessages(finalMessages);

    saveMessages(finalMessages);
  } catch (error) {
    const finalMessages = [
      ...updatedMessages,
      {
        role: "assistant",
        content:
          "Unable to connect to AI service.",
      },
    ];

    setMessages(finalMessages);

    saveMessages(finalMessages);

    console.error(error);
  } finally {
    setLoading(false);
  }
}

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[100] rounded-full bg-orange-500 p-4 text-black shadow-lg transition hover:scale-110"
      >
        <Bot size={16} />
      </button>

      {/* Panel */}

      {open && (
        <div className="fixed bottom-6 right-6 z-[101] flex h-[650px] w-[380px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">

          {/* Header */}

         <div className="flex items-center justify-between border-b border-border p-5">

  <div className="flex items-center gap-3">

    <Bot
      size={24}
      className="text-orange-500"
    />

    <div>
      <h3 className="font-bold">
        ConnectSphere AI
      </h3>

      <p className="text-xs text-green-500">
        Online
      </p>
    </div>

  </div>

  <div className="flex items-center gap-2">

    <button
      onClick={() => {
        clearMessages();

        setMessages([
          {
            role: "assistant",
            content:
              "Hi! I'm your ConnectSphere AI Assistant.",
          },
        ]);
      }}
      className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-red-500"
    >
      <Trash2 size={18} />
    </button>

    <button
      onClick={() => setOpen(false)}
      className="rounded-lg p-2 hover:bg-zinc-800"
    >
      <X size={20} />
    </button>

  </div>

</div>

          {/* Messages */}

          <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-4">

            {messages.map(
              
              (msg, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-3 ${
                    msg.role === "user"
                      ? "ml-auto max-w-[80%] bg-orange-500 text-black"
                      : "max-w-[80%] bg-zinc-900"
                  }`}
                >
                  {loading && (
  <div className="max-w-[80%] rounded-2xl bg-zinc-900 p-4">
    AI is thinking...
  </div>
)}
                  {msg.content}
                </div>
              )
            )}

          </div>

          {/* Input */}

          <div className="border-t border-border p-4">

            <div className="flex gap-2">

              <input
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                placeholder="Ask anything..."
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 p-3 outline-none"
              />

              <button
                onClick={handleSend}
                className="rounded-xl bg-orange-500 px-4 text-black"
              >
                <Send size={18} />
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}
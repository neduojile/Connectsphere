"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Account created successfully");
    } else {
      setMessage(data.error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-zinc-400">
          Join ConnectSphere
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full rounded-xl bg-black p-3 border border-zinc-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl bg-black p-3 border border-zinc-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl bg-black p-3 border border-zinc-700"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-medium text-black"
          >
            Create Account
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
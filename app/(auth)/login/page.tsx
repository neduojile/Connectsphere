"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const response = await fetch(
      "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Login successful");
    } else {
      setMessage(data.error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-zinc-400">
          Sign in to ConnectSphere
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-black p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-black p-3"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-medium text-black"
          >
            Sign In
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
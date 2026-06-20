"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        localStorage.setItem(
          "connectsphere_user",
          JSON.stringify(data.user)
        );

        toast.success(
  "Authentication Successful",
  {
    duration: 3000,
  }
);
        setTimeout(() => {

          router.push("/dashboard");

        }, 1000);

      } else {
       toast.error(
  data.error || "Authentication Failed"
);
      }

    } catch (error) {

     toast.error(
  "Network Error. Please try again."
);
      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  return (
    
<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-card px-4 text-white">
   <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[180px]" />

<div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[120px]" />

<div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-400/5 blur-[120px]" />
 <div className="relative w-full max-w-md rounded-3xl border border-orange-500/20 bg-zinc-950/90 p-4 md:p-4 md:p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(249,115,22,0.25)]">

        <div className="mb-8 text-center animate-fade-in">

 <img
  src="/images/logo.png"
  alt="ConnectSphere"
  className="
    mx-auto
    h-24
    w-24
    object-contain
    drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]
  "
/>
  

  <h1 className="mt-4 text-3xl font-bold">
    Welcome Back
  </h1>

  <p className="mt-2 text-muted-foreground">
    Sign in to continue your growth journey
  </p>

</div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
           className="w-full rounded-xl border border-zinc-700 bg-black/40 p-3 transition-all duration-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            required
          />

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
             className="w-full rounded-xl border border-zinc-700 bg-black/40 p-3 pr-16 transition-all duration-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-3 text-sm text-muted-foreground"
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>

          </div>

          <div className="text-right">

            <button
              type="button"
              className="text-sm text-orange-500 hover:text-orange-400"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
          className="w-full rounded-xl border border-zinc-700 bg-black/40 p-3 pr-14 transition-all duration-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        

        <p className="mt-6 text-center text-sm text-muted-foreground">

          Don't have an account?{" "}

          <Link
            href="/register"
            className="text-orange-500 hover:text-orange-400"
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}
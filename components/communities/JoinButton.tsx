"use client";

import { useEffect, useState } from "react";

export default function JoinButton({
  communityId,
}: {
  communityId: string;
}) {
  const [joined, setJoined] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {
    async function checkMembership() {
      const storedUser =
        localStorage.getItem(
          "connectsphere_user"
        );

      setIsLoggedIn(
        !!storedUser
      );

      if (!storedUser) return;

      const user =
        JSON.parse(storedUser);

      try {
        const response =
          await fetch(
            "/api/communities/check-membership",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                communityId,
              }),
            }
          );

        const data =
          await response.json();

        setJoined(
          data.joined || false
        );
      } catch (error) {
        console.error(error);
      }
    }

    checkMembership();
  }, [communityId]);

  async function handleClick() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) {
      window.location.href =
        "/login";
      return;
    }

    const user =
      JSON.parse(storedUser);

    try {
      setLoading(true);

      const endpoint =
        joined
          ? "/api/communities/leave"
          : "/api/communities/join";

      const response =
        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            communityId,
          }),
        });

      const data =
        await response.json();

      if (data.success) {
        setJoined(
          !joined
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`mt-6 rounded-xl px-4 py-2 font-medium transition ${
        joined
          ? "bg-green-500 text-black"
          : !isLoggedIn
          ? "bg-blue-500 text-white"
          : "bg-orange-500 text-black"
      }`}
    >
      {loading
        ? "Please wait..."
        : joined
        ? "Leave Community"
        : !isLoggedIn
        ? "Sign In To Join"
        : "Join Community"}
    </button>
  );
}
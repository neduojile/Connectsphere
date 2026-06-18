"use client";

import { useEffect, useState } from "react";

export default function ProfileBanner() {
  const [banner, setBanner] =
    useState("");

  useEffect(() => {
    async function loadBanner() {
      const storedUser =
        localStorage.getItem(
          "connectsphere_user"
        );

      if (!storedUser) return;

      const user =
        JSON.parse(storedUser);

      const response =
        await fetch(
          "/api/profile",
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

      const data =
        await response.json();

      setBanner(
        data.user?.profile
          ?.bannerImage || ""
      );
    }

    loadBanner();
  }, []);

  if (banner) {
    return (
      <img
        src={banner}
        alt="Banner"
        className="h-40 w-full rounded-3xl object-cover"
      />
    );
  }

  return (
    <div className="h-40 rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />
  );
}
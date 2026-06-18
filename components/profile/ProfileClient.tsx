"use client";

import { useEffect, useState } from "react";

export default function ProfileClient() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const storedUser =
        localStorage.getItem(
          "connectsphere_user"
        );

      if (!storedUser) return;

      const localUser =
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
              userId:
                localUser.id,
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "PROFILE DATA:",
        data
      );
setUser(data.user);
    }

    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="text-zinc-500">
        Loading profile...
      </div>
    );
  }

  const initials =
    user.fullName
      ?.split(" ")
      .map(
        (name: string) =>
          name.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <>
      <div className="-mt-14 ml-6">

  {user?.profile?.profileImage &&
  user.profile.profileImage !== "" ? (

    <img
      src={user.profile.profileImage}
      alt="Profile"
      className="h-28 w-28 rounded-full border-4 border-black object-cover"
    />

  ) : (

    <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-black bg-zinc-900 text-4xl font-black">
      {initials}
    </div>

  )}

</div>

      <h1 className="mt-5 text-4xl font-black">
        {user.fullName}
      </h1>

      <p className="mt-2 text-muted-foreground">
        {user.email}
      </p>
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";

import {
  User,
  Palette,
  Bell,
  Shield,
  Lock,
  Bot,
  Database,
  Info,
  AlertTriangle,
} from "lucide-react";
export default function SettingsPage() {

  const [theme, setTheme] =
    useState("dark");

  const [communityUpdates,
    setCommunityUpdates] =
    useState(true);

  const [opportunityAlerts,
    setOpportunityAlerts] =
    useState(true);

  const [aiCoachAlerts,
    setAiCoachAlerts] =
    useState(true);

  const [publicProfile,
    setPublicProfile] =
    useState(true);

  const [allowMessages,
    setAllowMessages] =
    useState(true);

  const [showProjects,
    setShowProjects] =
    useState(true);

  const [careerGuidance,
    setCareerGuidance] =
    useState(true);

  const [learningPaths,
    setLearningPaths] =
    useState(true);

  const [dailyMotivation,
    setDailyMotivation] =
    useState(true);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

    const [
  currentPassword,
  setCurrentPassword,
] = useState("");

const [
  newPassword,
  setNewPassword,
] = useState("");

const [
  confirmPassword,
  setConfirmPassword,
] = useState("");

useEffect(() => {
  async function loadSettings() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

    setFullName(
      user.fullName || ""
    );

  setEmail(
  user.email || ""
);

document.documentElement.classList.add(
  "dark"
);

const savedTheme =
  localStorage.getItem(
    "connectsphere_theme"
  );

if (savedTheme) {
  setTheme(savedTheme);

  document.documentElement.classList.remove(
    "dark",
    "dark"
  );

  document.documentElement.classList.add(
    savedTheme
  );
}

    try {
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

      if (!data.profile) return;

      setTheme(
        data.profile.theme ||
          "dark"
      );

      document.documentElement.classList.remove(
  "dark",
  "dark"
);

document.documentElement.classList.add(
  data.profile.theme || "dark"
);

      setCommunityUpdates(
        data.profile
          .communityUpdates ??
          true
      );

      setOpportunityAlerts(
        data.profile
          .opportunityAlerts ??
          true
      );

      setAiCoachAlerts(
        data.profile
          .aiCoachAlerts ??
          true
      );

      setPublicProfile(
        data.profile
          .publicProfile ??
          true
      );

      setAllowMessages(
        data.profile
          .allowMessages ??
          true
      );

      setShowProjects(
        data.profile
          .showProjects ??
          true
      );

      setCareerGuidance(
        data.profile
          .careerGuidance ??
          true
      );

      setLearningPaths(
        data.profile
          .learningPaths ??
          true
      );

      setDailyMotivation(
        data.profile
          .dailyMotivation ??
          true
      );
    } catch (error) {
      console.error(error);
    }
  }

  loadSettings();
}, []);

async function updateAccount() {
  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

  setLoading(true);

  try {
    const response =
      await fetch(
        "/api/settings/account",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            fullName,
            email,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      localStorage.setItem(
        "connectsphere_user",
        JSON.stringify({
          ...user,
          fullName,
          email,
        })
      );

      alert(
        "Account updated successfully"
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

function changeTheme(
  selectedTheme: string
) {
  setTheme(selectedTheme);

  localStorage.setItem(
    "connectsphere_theme",
    selectedTheme
  );

  document.documentElement.classList.remove(
    "dark",
    "dark"
  );

  document.documentElement.classList.add(
    selectedTheme
  );
}

async function saveSettings() {
  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

  try {
    const response =
      await fetch(
        "/api/settings/update",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            theme,
            communityUpdates,
            opportunityAlerts,
            aiCoachAlerts,
            publicProfile,
            allowMessages,
            showProjects,
            careerGuidance,
            learningPaths,
            dailyMotivation,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      alert(
        "Settings saved successfully"
      );
    }
  } catch (error) {
    console.error(error);
  }
}

async function changePassword() {
  if (
    newPassword !==
    confirmPassword
  ) {
    alert(
      "Passwords do not match"
    );
    return;
  }

  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

  try {
    const response =
      await fetch(
        "/api/settings/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            currentPassword,
            newPassword,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      alert(
        "Password changed successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(
        data.error
      );
    }
  } catch (error) {
    console.error(error);

    alert(
      "Failed to change password"
    );
  }
}

async function deleteAccount() {
  const confirmDelete =
    confirm(
      "Are you sure you want to permanently delete your account?"
    );

  if (!confirmDelete) return;

  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

  try {
    const response =
      await fetch(
        "/api/settings/delete-account",
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

    if (data.success) {
      localStorage.removeItem(
        "connectsphere_user"
      );

      window.location.href =
        "/register";
    }
  } catch (error) {
    console.error(error);
  }
}


async function exportProfileData() {
  try {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) {
      alert("No user found");
      return;
    }

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

    const blob =
      new Blob(
        [
          JSON.stringify(
            data,
            null,
            2
          ),
        ],
        {
          type:
            "application/json",
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "connectsphere-profile.json";

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    window.URL.revokeObjectURL(
      url
    );

    alert(
      "Profile exported successfully"
    );
  } catch (error) {
    console.error(error);

    alert(
      "Export failed"
    );
  }
}
  return (
    <AppLayout>

      <div className="mx-auto max-w-6xl">

        {/* Hero */}

        <div className="relative overflow-hidden rounded-3xl border border-borderbg-gradient-to-br from-zinc-950 via-zinc-950 to-orange-950/20 p-4 md:p-4 md:p-8">

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10">

            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
              Settings Center
            </p>

            <h1 className="mt-4 text-3xl md:text-5xl font-black">
              Account Settings
            </h1>

            <p className="mt-5 max-w-2xl text-zinc-400">
              Manage your account preferences,
              notifications, privacy, security,
              AI coaching experience and platform settings.
            </p>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-4 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

         <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-3xl font-black text-orange-500">
              100%
            </h3>

          <p className="text-muted-foreground">
              Profile Status
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-3xl font-black text-orange-500">
              4
            </h3>

          <p className="text-muted-foreground">
              Active Preferences
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-3xl font-black text-orange-500">
              AI
            </h3>

            <p className="text-muted-foreground">
              Coach Enabled
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-3xl font-black text-orange-500">
              Safe
            </h3>

            <p className="text-muted-foreground">
              Security Status
            </p>
          </div>

        </div>

        {/* Settings Grid */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Account */}

          <div className="rounded-3xl border border-border bg-card p-6">

            <div className="flex items-center gap-3">
              <User
                className="text-orange-500"
                size={24}
              />

              <h2 className="text-2xl font-bold">
                Account
              </h2>
            </div>

            <p className="mt-3 text-zinc-400">
              Update your account information.
            </p>

            <div className="mt-6 space-y-4">

             <input
               value={fullName}
              onChange={(e) =>
                   setFullName(e.target.value)
                  }
                   placeholder="Full Name"
                   className="w-full rounded-xl border border-border bg-background p-4"
                    />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              
  className="w-full rounded-xl border border-border bg-background p-4"

              />

                              <button
                  onClick={updateAccount}
                  disabled={loading}
                  className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black"
                >
                  {loading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

            </div>

          </div>

          {/* Appearance */}

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Palette
                className="text-orange-500"
                size={24}
              />

              <h2 className="text-2xl font-bold">
                Appearance
              </h2>
            </div>

            <p className="mt-3 text-zinc-400">
              Customize your visual experience.
            </p>

            <div className="mt-6 flex gap-3">

                            <button
                 onClick={() => {
  setTheme("dark");

  document.documentElement.classList.remove(
    "dark"
  );

  document.documentElement.classList.add(
    "dark"
  );
}}
                  className={`rounded-xl px-4 py-2 font-medium ${
                    theme === "dark"
                      ? "bg-orange-500 text-black"
                      : "border border-zinc-700"
                  }`}
                >
                  Dark
                </button>

     

                            <button
                  onClick={() =>
                    setTheme("system")
                  }
                  className={`rounded-xl px-4 py-2 font-medium ${
                    theme === "system"
                      ? "bg-orange-500 text-black"
                      : "border border-zinc-700"
                  }`}
                >
                  System
                </button>

            </div>

          </div>

          {/* Notifications */}

          <div className="rounded-3xl border border-border bg-card p-6">

            <div className="flex items-center gap-3">
              <Bell
                className="text-orange-500"
                size={24}
              />

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>
            </div>

            <div className="mt-6 space-y-4">

              <label className="flex justify-between">
                <span>Community Updates</span>
               <input
  type="checkbox"
  checked={communityUpdates}
  onChange={() =>
    setCommunityUpdates(
      !communityUpdates
    )
  }
/>
              </label>

              <label className="flex justify-between">
                <span>Opportunity Alerts</span>
               <input
  type="checkbox"
  checked={opportunityAlerts}
  onChange={() =>
    setOpportunityAlerts(
      !opportunityAlerts
    )
  }
/>
              </label>

              <label className="flex justify-between">
                <span>AI Coach Alerts</span>
                <input
  type="checkbox"
  checked={aiCoachAlerts}
  onChange={() =>
    setAiCoachAlerts(
      !aiCoachAlerts
    )
  }
/>
              </label>

            </div>

          </div>

          {/* Privacy */}

         <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Shield
                className="text-orange-500"
                size={24}
              />

              <h2 className="text-2xl font-bold">
                Privacy
              </h2>
            </div>

            <div className="mt-6 space-y-4">

              <label className="flex justify-between">
                <span>Public Profile</span>
               <input
  type="checkbox"
  checked={publicProfile}
  onChange={() =>
    setPublicProfile(
      !publicProfile
    )
  }
/>
              </label>

              <label className="flex justify-between">
                <span>Allow Messages</span>
                <input
  type="checkbox"
  checked={allowMessages}
  onChange={() =>
    setAllowMessages(
      !allowMessages
    )
  }
/>
              </label>

              <label className="flex justify-between">
                <span>Show Projects</span>
                <input
  type="checkbox"
  checked={showProjects}
  onChange={() =>
    setShowProjects(
      !showProjects
    )
  }
/>
              </label>

            </div>

          </div>

          {/* Security */}

          <div className="rounded-3xl border border-border bg-card p-6">

            <div className="flex items-center gap-3">
              <Lock
                className="text-orange-500"
                size={24}
              />

              <h2 className="text-2xl font-bold">
                Security
              </h2>
            </div>

            <div className="mt-6 flex flex-col gap-3">

              <div className="space-y-3">

  <input
    type="password"
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) =>
      setCurrentPassword(
        e.target.value
      )
    }
    className="w-full rounded-xl border border-zinc-700 bg-black p-4"
  />

  <input
    type="password"
    placeholder="New Password"
    value={newPassword}
    onChange={(e) =>
      setNewPassword(
        e.target.value
      )
    }
    className="w-full rounded-xl border border-zinc-700 bg-black p-4"
  />

  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) =>
      setConfirmPassword(
        e.target.value
      )
    }
    className="w-full rounded-xl border border-zinc-700 bg-black p-4"
  />

  <button
    onClick={changePassword}
    className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black"
  >
    Change Password
  </button>

</div>

              <button className="rounded-xl border border-zinc-700 p-4 text-left">
                Active Sessions
              </button>

              <button className="rounded-xl border border-zinc-700 p-4 text-left">
                Two Factor Authentication
              </button>

            </div>

          </div>

          {/* AI Coach */}

          <div className="rounded-3xl border border-border bg-card p-6">

            <div className="flex items-center gap-3">
              <Bot
                className="text-orange-500"
                size={24}
              />

              <h2 className="text-2xl font-bold">
                AI Coach
              </h2>
            </div>

            <div className="mt-6 space-y-4">

              <label className="flex justify-between">
                <span>Career Guidance</span>
                <input
                  type="checkbox"
                  checked={careerGuidance}
                  onChange={() =>
                    setCareerGuidance(!careerGuidance)
                  }
                />
              </label>

              <label className="flex justify-between">
                <span>Learning Paths</span>
               <input
  type="checkbox"
  checked={learningPaths}
  onChange={() =>
    setLearningPaths(
      !learningPaths
    )
  }
/>
              </label>

              <label className="flex justify-between">
                <span>Daily Motivation</span>
                <input
                  type="checkbox"
                  checked={dailyMotivation}
                  onChange={() =>
                    setDailyMotivation(!dailyMotivation)
                  }
                />
              </label>

            </div>

          </div>

          {/* Data */}

          <div className="rounded-3xl border border-border bg-card p-6">

            <div className="flex items-center gap-3">
              <Database
                className="text-orange-500"
                size={24}
              />

              <h2 className="text-2xl font-bold">
                Data Export
              </h2>
            </div>

            <div className="mt-6 flex flex-col gap-3">

             <button
  onClick={
    exportProfileData
  }
  className="rounded-xl border border-zinc-700 p-4 text-left"
>
  Export Profile Data
</button>

              <button className="rounded-xl border border-zinc-700 p-4 text-left">
                Export Projects
              </button>

            </div>

          </div>

          {/* About */}

          <div className="rounded-3xl border border-border bg-card p-6">

            <div className="flex items-center gap-3">
              <Info
                className="text-orange-500"
                size={24}
              />

              <h2 className="text-2xl font-bold">
                About
              </h2>
            </div>

            <div className="mt-6 space-y-3">

              <div className="rounded-xl border border-border- p-4">
                Version 1.0.0
              </div>

              <div className="rounded-xl border border-border p-4">
                Privacy Policy
              </div>

              <div className="rounded-xl border border-border p-4">
                Terms of Service
              </div>

            </div>

          </div>

        </div>

        <div className="mt-8 flex justify-end">
  <button
    onClick={saveSettings}
    className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black"
  >
    Save Settings
  </button>
</div>

        {/* Advanced Options */}
<div className="mt-8 rounded-3xl border border-red-500/30 bg-red-500/5 p-6">

  <div className="flex items-center gap-3">

    <AlertTriangle
      size={24}
      className="text-red-500"
    />

    <h2 className="text-2xl font-bold">
      Account Management
    </h2>

  </div>

  <p className="mt-3 text-zinc-400">
    Manage account access, logout, and account removal options.
  </p>

  <div className="mt-6 flex gap-4">

    <button
  onClick={deleteAccount}
  className="rounded-xl border border-red-500 px-5 py-3 text-red-400"
>
  Delete Account
</button>
    <button
  onClick={() => {
    localStorage.removeItem(
      "connectsphere_user"
    );

    window.location.href =
      "/login";
  }}
  className="rounded-xl border border-zinc-700 px-5 py-3"
>
  Logout
</button>

  </div>

</div>

        </div>

    
    </AppLayout>
  );
}
"use client";

import { useState } from "react";

const careerOptions = [
  "Cybersecurity Engineer",
  "Blockchain Developer",
  "AI Engineer",
  "Software Engineer",
  "Mobile Developer",
  "UI/UX Designer",
  "Data Analyst",
  "Product Manager",
  "Entrepreneur",
  "Researcher",
];

const interestOptions = [
  "Blockchain",
  "Artificial Intelligence",
  "Cybersecurity",
  "Leadership",
  "Research",
  "Startups",
  "Open Source",
  "Web Development",
  "Mobile Development",
  "Community Building",
  "Cloud Computing",
  "DevOps",
];

const skillOptions = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "Rust",
  "Solidity",
  "Linux",
  "Docker",
  "Git",
  "AWS",
  "Figma",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const [careerGoal, setCareerGoal] =
    useState("");

  const [interests, setInterests] =
    useState<string[]>([]);

  const [skills, setSkills] =
    useState<string[]>([]);

  const [
    experienceLevel,
    setExperienceLevel,
  ] = useState("");

  const [faithBased, setFaithBased] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  function toggleInterest(
    interest: string
  ) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter(
            (item) => item !== interest
          )
        : [...prev, interest]
    );
  }

  function toggleSkill(skill: string) {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter(
            (item) => item !== skill
          )
        : [...prev, skill]
    );
  }

  async function handleSubmit() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) {
      alert("Please login first");
      return;
    }

    const user =
      JSON.parse(storedUser);

    try {
      setLoading(true);

      const response = await fetch(
        "/api/onboarding",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            careerGoal,
            interests:
              interests.join(", "),
            skills:
              skills.join(", "),
            experienceLevel,
            faithBased,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        window.location.href =
          "/dashboard";
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save onboarding"
      );
    } finally {
      setLoading(false);
    }
  }

  const progress =
    (step / 6) * 100;

  return (
    <div className="min-h-screen bg-card px-4 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8">

          <div className="mb-3 flex justify-between">

            <span className="text-muted-foreground">
              Step {step} of 6
            </span>

            <span className="text-orange-500">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="h-3 rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        <div className="rounded-3xl border border-border bg-zinc-950 p-8">

          {step === 1 && (
            <>
              <h1 className="text-4xl font-black">
                What do you want to become?
              </h1>

              <p className="mt-3 text-muted-foreground">
                Choose your primary career path.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">

                {careerOptions.map(
                  (career) => (
                    <button
                      key={career}
                      onClick={() =>
                        setCareerGoal(
                          career
                        )
                      }
                      className={`rounded-2xl border p-5 text-left transition ${
                        careerGoal === career
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-border"
                      }`}
                    >
                      {career}
                    </button>
                  )
                )}

              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-4xl font-black">
                Select Your Interests
              </h1>

              <p className="mt-3 text-muted-foreground">
                Choose all that apply.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                {interestOptions.map(
                  (interest) => (
                    <button
                      key={interest}
                      onClick={() =>
                        toggleInterest(
                          interest
                        )
                      }
                      className={`rounded-full px-4 py-2 transition ${
                        interests.includes(
                          interest
                        )
                          ? "bg-orange-500 text-black"
                          : "bg-zinc-900"
                      }`}
                    >
                      {interest}
                    </button>
                  )
                )}

              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-4xl font-black">
                Select Your Skills
              </h1>

              <p className="mt-3 text-muted-foreground">
                Choose your current skills.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                {skillOptions.map(
                  (skill) => (
                    <button
                      key={skill}
                      onClick={() =>
                        toggleSkill(skill)
                      }
                      className={`rounded-full px-4 py-2 transition ${
                        skills.includes(
                          skill
                        )
                          ? "bg-orange-500 text-black"
                          : "bg-zinc-900"
                      }`}
                    >
                      {skill}
                    </button>
                  )
                )}

              </div>
            </>
          )}

                    {step === 4 && (
            <>
              <h1 className="text-4xl font-black">
                Experience Level
              </h1>

              <p className="mt-3 text-muted-foreground">
                Tell us where you currently are.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">

                {[
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                  "Professional",
                ].map((level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setExperienceLevel(
                        level
                      )
                    }
                    className={`rounded-2xl border p-5 text-left transition ${
                      experienceLevel ===
                      level
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-border"
                    }`}
                  >
                    {level}
                  </button>
                ))}

              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h1 className="text-4xl font-black">
                Growth Preference
              </h1>

              <p className="mt-3 text-muted-foreground">
                Personalize your journey.
              </p>

              <div className="mt-8 space-y-4">

                <button
                  onClick={() =>
                    setFaithBased(true)
                  }
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    faithBased
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-border"
                  }`}
                >
                  ✨ Include faith-based
                  mentorship, growth content,
                  scripture insights and
                  spiritual encouragement.
                </button>

                <button
                  onClick={() =>
                    setFaithBased(false)
                  }
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    !faithBased
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-border"
                  }`}
                >
                  🚀 Professional growth
                  only.
                </button>

              </div>
            </>
          )}

          {step === 6 && (
            <>
              <h1 className="text-4xl font-black">
                AI Profile Summary
              </h1>

              <p className="mt-3 text-muted-foreground">
                Review your personalized
                profile.
              </p>

              <div className="mt-8 space-y-4">

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-zinc-500">
                    Career Goal
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {careerGoal}
                  </h3>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-zinc-500">
                    Interests
                  </p>

                  <h3 className="mt-2">
                    {interests.join(", ")}
                  </h3>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-zinc-500">
                    Skills
                  </p>

                  <h3 className="mt-2">
                    {skills.join(", ")}
                  </h3>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-zinc-500">
                    Experience Level
                  </p>

                  <h3 className="mt-2">
                    {experienceLevel}
                  </h3>
                </div>

                <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
                  <h3 className="font-bold text-orange-500">
                    AI Recommendation
                  </h3>

                  <p className="mt-2 text-zinc-300">
                    Based on your profile,
                    ConnectSphere will recommend
                    relevant communities,
                    mentors, projects and
                    opportunities that align
                    with your goals.
                  </p>
                </div>

              </div>
            </>
          )}

          <div className="mt-10 flex justify-between">

            <button
              onClick={() =>
                setStep((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              disabled={step === 1}
              className="rounded-xl border border-zinc-700 px-6 py-3 transition disabled:opacity-40"
            >
              Back
            </button>

            {step < 6 ? (
              <button
                onClick={() =>
                  setStep((prev) =>
                    prev + 1
                  )
                }
                className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-black transition hover:bg-orange-400"
              >
                {loading
                  ? "Saving..."
                  : "Finish Setup"}
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
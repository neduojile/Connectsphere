"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}
const careerOptions = [
  "Blockchain Developer",
  "AI Engineer",
  "Cybersecurity Engineer",
  "Software Engineer",
  "Mobile Developer",
  "UI/UX Designer",
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
];

const skillOptions = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "Rust",
  "Solidity",
  "Linux",
  "Docker",
  "Git",
  "AWS",
];

export default function OnboardingModal({
  open,
  onClose,
}: OnboardingModalProps) {
  const [step, setStep] =
    useState(1);

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

  const [saving, setSaving] =
    useState(false);

  const progress =
    (step / 6) * 100;

  function toggleInterest(
    interest: string
  ) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter(
            (i) => i !== interest
          )
        : [...prev, interest]
    );
  }

  function toggleSkill(
    skill: string
  ) {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter(
            (s) => s !== skill
          )
        : [...prev, skill]
    );
  }

  async function finishOnboarding() {
    try {
      setSaving(true);

      const storedUser =
        localStorage.getItem(
          "connectsphere_user"
        );

      if (!storedUser) return;

      const user =
        JSON.parse(storedUser);

      const response =
        await fetch(
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

     console.log(
  "Response status:",
  response.status
);

const data =
  await response.json();

console.log(
  "Response data:",
  data
);

    if (!response.ok) {
  console.error(data);
  alert(
    JSON.stringify(data)
  );
  return;
}

if (data.success) {
    
  localStorage.setItem(
    "connectsphere_user",
    JSON.stringify({
      ...user,
      profile: data.profile,
    })
  );

  window.location.href =
    "/dashboard";
}
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

    return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-card/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="relative z-50 w-full max-w-4xl overflow-y-auto max-h-[95vh] rounded-3xl border border-border bg-zinc-950 p-4 md:p-8 text-white shadow-2xl"
          >
            <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="flex items-center gap-3">

  <img
    src="/images/logo.png"
    alt="ConnectSphere"
    className="h-12 w-12 object-contain"
  />

  <div>

    <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
      ConnectSphere Setup
    </p>

  </div>

</div>

           <h2 className="mt-4 text-3xl md:text-4xl font-black">
              Personalize Your Journey
            </h2>

            <p className="mt-4 text-muted-foreground">
              Help us discover your interests,
              mentors, communities and growth
              opportunities.
            </p>

            <div className="mt-8">
              <div className="mb-3 flex justify-between text-sm">
                <span>
                  Step {step} of 6
                </span>

                <span>
                  {Math.round(
                    progress
                  )}
                  %
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="h-full rounded-full bg-orange-500"
                />
              </div>
            </div>

            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="mt-6 md:mt-10 min-h-[250px] md:min-h-[320px]"
            >

              {step === 1 && (
                <div>
                  <h3 className="mb-6 text-2xl font-bold">
                    Choose Career Goal
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    {careerOptions.map(
                      (career) => (
                        <button
                          key={career}
                          type="button"
                          onClick={() =>
                            setCareerGoal(
                              career
                            )
                          }
                         className={`rounded-2xl border p-4 md:p-5 text-left transition ${
                            careerGoal ===
                            career
                              ? "border-orange-500 bg-orange-500/10"
                              : "border-border hover:border-zinc-600"
                          }`}
                        >
                          {career}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-2xl font-bold">
                      Select Interests
                    </h3>

                    <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-black">
                      {interests.length}
                      {" "}
                      Selected
                    </span>
                  </div>

                  <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    {interestOptions.map(
                      (interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() =>
                            toggleInterest(
                              interest
                            )
                          }
                         className={`rounded-xl border p-3 md:p-4 text-left transition ${
                            interests.includes(
                              interest
                            )
                              ? "border-orange-500 bg-orange-500/10"
                              : "border-border hover:border-zinc-600"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>
                              {interest}
                            </span>

                            {interests.includes(
                              interest
                            ) && (
                              <span>
                                ✓
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-2xl font-bold">
                      Select Skills
                    </h3>

                    <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-black">
                      {skills.length}
                      {" "}
                      Selected
                    </span>
                  </div>

                  <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
                    {skillOptions.map(
                      (skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() =>
                            toggleSkill(
                              skill
                            )
                          }
                         className={`rounded-xl border p-3 md:p-4 transition ${
                            skills.includes(
                              skill
                            )
                              ? "border-orange-500 bg-orange-500/10"
                              : "border-border hover:border-zinc-600"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>
                              {skill}
                            </span>

                            {skills.includes(
                              skill
                            ) && (
                             <span className="font-bold text-orange-500">
  ✓
</span>
                            )}
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="mb-6 text-2xl font-bold">
                    Experience Level
                  </h3>

                  <div className="grid gap-4">
                    {[
                      "Beginner",
                      "Intermediate",
                      "Advanced",
                      "Expert",
                    ].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() =>
                          setExperienceLevel(
                            level
                          )
                        }
                       className={`rounded-xl border p-3 md:p-4 text-left transition ${
                          experienceLevel ===
                          level
                            ? "border-orange-500 bg-orange-500/10"
                            : "border-border hover:border-zinc-600"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="mb-6 text-2xl font-bold">
                    Faith Preferences
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      setFaithBased(
                        !faithBased
                      )
                    }
                    className={`w-full rounded-xl border p-5 text-left transition ${
                      faithBased
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-border hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        Show Faith-Based
                        Content
                      </span>

                      {faithBased && (
                        <span>
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              )}

              {step === 6 && (
                <div>
                  <h3 className="mb-6 text-2xl font-bold">
                    Review Your Profile
                  </h3>

                  <div className="space-y-4 rounded-2xl border border-border bg-card/30 p-5">

                    <p>
                      <strong>
                        Career:
                      </strong>{" "}
                      {careerGoal}
                    </p>

                    <p>
                      <strong>
                        Interests:
                      </strong>{" "}
                      {interests.join(
                        ", "
                      )}
                    </p>

                    <p>
                      <strong>
                        Skills:
                      </strong>{" "}
                      {skills.join(
                        ", "
                      )}
                    </p>

                    <p>
                      <strong>
                        Experience:
                      </strong>{" "}
                      {
                        experienceLevel
                      }
                    </p>

                    <p>
                      <strong>
                        Faith Based:
                      </strong>{" "}
                      {faithBased
                        ? "Yes"
                        : "No"}
                    </p>

                  </div>
                </div>
              )}

            </motion.div>

            <div className="mt-8 flex justify-between">

              <button
                type="button"
                onClick={() =>
                  setStep((prev) =>
                    prev > 1
                      ? prev - 1
                      : 1
                  )
                }
                disabled={step === 1}
               className="rounded-xl border border-zinc-700 px-4 md:px-6 py-3 disabled:opacity-40"
              >
                Back
              </button>

              {step < 6 ? (
                <button
                  type="button"
                  onClick={() =>
                    setStep((prev) =>
                      prev + 1
                    )
                  }
                  disabled={
                    (step === 1 &&
                      !careerGoal) ||
                    (step === 2 &&
                      interests.length ===
                        0) ||
                    (step === 3 &&
                      skills.length ===
                        0) ||
                    (step === 4 &&
                      !experienceLevel)
                  }
                  className="rounded-xl bg-orange-500 px-4 md:px-6 py-3 font-semibold text-black disabled:opacity-40"
                >
                  Next
                </button>
              ) : (
                <button
  onClick={finishOnboarding}
  disabled={saving}
  className="rounded-xl bg-green-500 px-6 py-3 font-semibold text-black disabled:opacity-50"
>
  {saving
    ? "Saving..."
    : "Finish Setup"}
</button>
              )}

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      userId,
      careerGoal,
      interests,
      skills,
      experienceLevel,
      faithBased,
    } = await req.json();

    let connectScore = 0;

    if (careerGoal) connectScore += 20;

    if (
      interests &&
      interests.length > 0
    )
      connectScore += 20;

    if (
      skills &&
      skills.length > 0
    )
      connectScore += 20;

    if (experienceLevel)
      connectScore += 20;

    if (faithBased !== undefined)
      connectScore += 20;

    const profile =
  await prisma.profile.upsert({
    where: {
      userId,
    },

    update: {
      careerGoal,

      interests: Array.isArray(interests)
        ? interests.join(", ")
        : interests,

      skills: Array.isArray(skills)
        ? skills.join(", ")
        : skills,

      experienceLevel,

      faithBased,

      connectScore,
    },

    create: {
      userId,

      careerGoal,

      interests: Array.isArray(interests)
        ? interests.join(", ")
        : interests,

      skills: Array.isArray(skills)
        ? skills.join(", ")
        : skills,

      experienceLevel,

      faithBased,

      connectScore,
    },
  });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to save onboarding",
      },
      {
        status: 500,
      }
    );
  }
}
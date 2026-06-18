import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      userId,
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
    } = await req.json();

    const profile =
      await prisma.profile.update({
        where: {
          userId,
        },
        data: {
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
        },
      });

    console.log(
      "SAVED SETTINGS:",
      profile
    );

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save settings",
      },
      {
        status: 500,
      }
    );
  }
}
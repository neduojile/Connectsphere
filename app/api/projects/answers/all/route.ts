import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request
) {
  const { searchParams } =
    new URL(req.url);

  const projectId =
    searchParams.get(
      "projectId"
    );

  const questions =
    await prisma.projectQuestion.findMany({
      where: {
        projectId:
          projectId || "",
      },

      include: {
        answers: {
          include: {
            user: true,
          },
        },
      },
    });

  return NextResponse.json({
    success: true,
    questions,
  });
}
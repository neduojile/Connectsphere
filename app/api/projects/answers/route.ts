import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    const questionId =
      searchParams.get("questionId");

    const answers =
      await prisma.projectAnswer.findMany({
        where: {
          questionId:
            questionId || "",
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    return NextResponse.json({
      success: true,
      answers,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load answers",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const answer =
      await prisma.projectAnswer.create({
        data: {
          content:
            body.content,
          userId:
            body.userId,
          questionId:
            body.questionId,
        },
      });

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create answer",
      },
      {
        status: 500,
      }
    );
  }
}
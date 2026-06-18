import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    const projectId =
      searchParams.get("projectId");

    const questions =
      await prisma.projectQuestion.findMany({
        where: {
          projectId:
            projectId || "",
        },
        include: {
          user: true,
          answers: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load questions",
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

    const question =
      await prisma.projectQuestion.create({
        data: {
          title:
            body.title,
          content:
            body.content,
          userId:
            body.userId,
          projectId:
            body.projectId,
        },
      });

    return NextResponse.json({
      success: true,
      question,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create question",
      },
      {
        status: 500,
      }
    );
  }
}
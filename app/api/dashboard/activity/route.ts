import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {

    const { userId } =
      await req.json();

    const projects =
      await prisma.project.findMany({
        where: {
          OR: [
            {
              ownerId: userId,
            },
            {
              memberships: {
                some: {
                  userId,
                },
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

    const communities =
      await prisma.communityMembership.findMany({
        where: {
          userId,
        },
        include: {
          community: true,
        },
       orderBy: {
  createdAt: "desc",
},
        take: 5,
      });

    const questions =
      await prisma.projectQuestion.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

    return NextResponse.json({
      success: true,
      projects,
      communities,
      questions,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }
}
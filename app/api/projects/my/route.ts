import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const { userId } =
      await req.json();

    const ownedProjects =
      await prisma.project.findMany({
        where: {
          ownerId: userId,
        },
      });

    const joinedProjects =
      await prisma.projectMembership.findMany({
        where: {
          userId,
        },
        include: {
          project: true,
        },
      });

    return NextResponse.json({
      success: true,
      ownedProjects,
      joinedProjects,
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
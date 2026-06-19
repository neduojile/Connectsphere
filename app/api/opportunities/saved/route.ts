import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const { userId } =
      await req.json();

    const opportunities =
      await prisma.savedOpportunity.findMany({
        where: {
          userId,
        },
        include: {
          opportunity: true,
        },
      });

    return NextResponse.json({
      success: true,
      opportunities,
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
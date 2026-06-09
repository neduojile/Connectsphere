import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await prisma.community.createMany({
    data: [
      {
        name: "Product Builders",
        description: "Youth building digital products",
      },
      {
        name: "Leadership Circle",
        description: "Leadership development community",
      },
      {
        name: "Tech Innovators",
        description: "Developers and engineers network",
      },
    ],
  });

  return NextResponse.json({
    success: true,
  });
}
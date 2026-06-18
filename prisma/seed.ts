import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mentor.deleteMany();

  await prisma.mentor.createMany({
    data: [
      {
        fullName: "Sarah Johnson",
        profession: "Blockchain Mentor",
        category: "Blockchain Developer",
        location: "Lagos",
      },

      {
        fullName: "David Michael",
        profession: "AI Engineer",
        category: "AI Engineer",
        location: "Abuja",
      },

      {
        fullName: "Grace Daniel",
        profession: "Cybersecurity Expert",
        category: "Cybersecurity Engineer",
        location: "Enugu",
      },
    ],
  });

  console.log("Mentors seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
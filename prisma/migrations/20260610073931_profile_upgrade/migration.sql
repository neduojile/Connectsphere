-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "availabilityStatus" TEXT DEFAULT 'Open',
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "portfolioUrl" TEXT;

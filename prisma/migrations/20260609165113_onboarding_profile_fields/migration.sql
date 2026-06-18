-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Technology';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "faithBased" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interests" TEXT,
ADD COLUMN     "skills" TEXT;

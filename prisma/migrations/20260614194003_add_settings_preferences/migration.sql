-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "aiCoachAlerts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowMessages" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "careerGuidance" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "communityUpdates" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "dailyMotivation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "learningPaths" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "opportunityAlerts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "publicProfile" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showProjects" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'dark';

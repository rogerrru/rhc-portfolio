-- AlterTable
-- IF NOT EXISTS: the Render build runs `prisma db push`, which may add this column before this migration is applied.
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "mobileScreenshots" TEXT[] DEFAULT ARRAY[]::TEXT[];

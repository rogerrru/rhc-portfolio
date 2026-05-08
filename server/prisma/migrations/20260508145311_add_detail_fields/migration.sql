-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "about" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "takeaways" TEXT[],
ADD COLUMN     "team" TEXT,
ADD COLUMN     "whatWeDid" TEXT;

-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "about" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "takeaways" TEXT[],
ADD COLUMN     "team" TEXT,
ADD COLUMN     "whatWeDid" TEXT;

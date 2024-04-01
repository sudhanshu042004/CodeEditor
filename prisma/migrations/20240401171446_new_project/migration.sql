-- DropIndex
DROP INDEX "Projects_filename_key";

-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "filename" SET DEFAULT 'Untitled',
ALTER COLUMN "content" DROP DEFAULT,
ALTER COLUMN "content" SET DATA TYPE TEXT;

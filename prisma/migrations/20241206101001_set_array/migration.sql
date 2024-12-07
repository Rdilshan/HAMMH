/*
  Warnings:

  - The `Images` column on the `Clinic` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Clinic" DROP COLUMN "Images",
ADD COLUMN     "Images" TEXT[];

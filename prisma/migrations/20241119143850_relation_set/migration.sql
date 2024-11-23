/*
  Warnings:

  - Added the required column `patient_id` to the `Injection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Injection" ADD COLUMN     "patient_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Injection" ADD CONSTRAINT "Injection_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "ClincType" AS ENUM ('Genaral_Clinic', 'Child_Adolescent_guidance_clinic', 'Substance_abuse_clinic', 'Gender_based_violence_clinic', 'Elderly_clinic', 'Other');

-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "clinc_type" "ClincType" NOT NULL DEFAULT 'Genaral_Clinic';

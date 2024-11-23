-- CreateEnum
CREATE TYPE "Attence" AS ENUM ('Not_attence', 'Attend', 'booking');

-- CreateTable
CREATE TABLE "Clinic" (
    "id" SERIAL NOT NULL,
    "Images" TEXT NOT NULL,
    "clinc_data" TIMESTAMP(3) NOT NULL,
    "next_data" TIMESTAMP(3) NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "status" "Attence" NOT NULL DEFAULT 'booking',

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

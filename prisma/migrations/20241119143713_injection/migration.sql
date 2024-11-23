-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Choice" AS ENUM ('Yes', 'No');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'doctor', 'nurse');

-- CreateEnum
CREATE TYPE "InjectionType" AS ENUM ('done', 'processing');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "telephone" TEXT NOT NULL,
    "Specialization" TEXT,
    "profile" TEXT,
    "gender" "Gender" NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "telephone" TEXT,
    "address" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "nic" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "source_reffern" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "clinic_session" TEXT,
    "condition" TEXT,
    "diagonsis" TEXT,
    "use_injection" "Choice",
    "injection_type" TEXT,
    "special_note" TEXT,
    "is_admit" "Choice" NOT NULL DEFAULT 'No',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospitaladmit" (
    "id" SERIAL NOT NULL,
    "ward" TEXT NOT NULL,
    "BHT_no" TEXT NOT NULL,
    "principal_diagnosis" TEXT NOT NULL,
    "procedures" TEXT NOT NULL,
    "mode_of_admission" TEXT NOT NULL,
    "special_note" TEXT NOT NULL,
    "made_of_discharge" TEXT,
    "dischagre_note" TEXT,
    "patient_id" INTEGER NOT NULL,
    "admit_date" TIMESTAMP(3) NOT NULL,
    "discharge_date" TIMESTAMP(3),

    CONSTRAINT "Hospitaladmit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Injection" (
    "id" SERIAL NOT NULL,
    "doctorName" TEXT,
    "nurseName" TEXT,
    "socialWorkers" TEXT,
    "drugType" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "NextDate" TIMESTAMP(3) NOT NULL,
    "Status" "InjectionType" NOT NULL,

    CONSTRAINT "Injection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Patients" ADD CONSTRAINT "Patients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospitaladmit" ADD CONSTRAINT "Hospitaladmit_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

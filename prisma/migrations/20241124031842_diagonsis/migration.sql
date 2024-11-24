-- CreateTable
CREATE TABLE "Diagonsis" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Icd_code" TEXT,

    CONSTRAINT "Diagonsis_pkey" PRIMARY KEY ("id")
);

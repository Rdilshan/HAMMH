-- CreateEnum
CREATE TYPE "Active_status" AS ENUM ('Active', 'Deactive');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active_status" "Active_status" NOT NULL DEFAULT 'Active',
ALTER COLUMN "password" DROP NOT NULL;

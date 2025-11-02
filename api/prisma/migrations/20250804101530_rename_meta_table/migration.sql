/*
  Warnings:

  - You are about to drop the `Meta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meta" DROP CONSTRAINT "Meta_id_fkey";

-- DropTable
DROP TABLE "Meta";

-- CreateTable
CREATE TABLE "VehicleMeta" (
    "meta_id" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "meta_key" TEXT NOT NULL,
    "meta_value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleMeta_pkey" PRIMARY KEY ("meta_id")
);

-- AddForeignKey
ALTER TABLE "VehicleMeta" ADD CONSTRAINT "VehicleMeta_id_fkey" FOREIGN KEY ("id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

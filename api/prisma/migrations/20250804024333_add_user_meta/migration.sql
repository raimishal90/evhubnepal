-- CreateTable
CREATE TABLE "UserMeta" (
    "meta_id" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "meta_key" TEXT NOT NULL,
    "meta_value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMeta_pkey" PRIMARY KEY ("meta_id")
);

-- AddForeignKey
ALTER TABLE "UserMeta" ADD CONSTRAINT "UserMeta_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

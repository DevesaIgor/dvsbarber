/*
  Warnings:

  - Added the required column `estabelecimentoId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estabelecimentoId` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estabelecimentoId` to the `Profissional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estabelecimentoId` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Cliente_email_key";

-- DropIndex
DROP INDEX "public"."Cliente_telefone_key";

-- AlterTable
ALTER TABLE "public"."Agendamento" ADD COLUMN     "estabelecimentoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Cliente" ADD COLUMN     "estabelecimentoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Profissional" ADD COLUMN     "estabelecimentoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Servico" ADD COLUMN     "estabelecimentoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Estabelecimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "telefone" TEXT,
    "endereco" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estabelecimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estabelecimento_slug_key" ON "public"."Estabelecimento"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Estabelecimento_email_key" ON "public"."Estabelecimento"("email");

-- AddForeignKey
ALTER TABLE "public"."Cliente" ADD CONSTRAINT "Cliente_estabelecimentoId_fkey" FOREIGN KEY ("estabelecimentoId") REFERENCES "public"."Estabelecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profissional" ADD CONSTRAINT "Profissional_estabelecimentoId_fkey" FOREIGN KEY ("estabelecimentoId") REFERENCES "public"."Estabelecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Servico" ADD CONSTRAINT "Servico_estabelecimentoId_fkey" FOREIGN KEY ("estabelecimentoId") REFERENCES "public"."Estabelecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Agendamento" ADD CONSTRAINT "Agendamento_estabelecimentoId_fkey" FOREIGN KEY ("estabelecimentoId") REFERENCES "public"."Estabelecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

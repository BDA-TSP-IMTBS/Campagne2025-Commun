/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Button` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[read_id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[write_id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Button_name_key" ON "Button"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_read_id_key" ON "Project"("read_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_write_id_key" ON "Project"("write_id");

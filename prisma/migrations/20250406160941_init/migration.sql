-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "read_id" TEXT NOT NULL,
    "write_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Button" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Button_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Object" (
    "id" SERIAL NOT NULL,
    "index" DOUBLE PRECISION NOT NULL,
    "data" TEXT NOT NULL,
    "buttonId" INTEGER NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "Button"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

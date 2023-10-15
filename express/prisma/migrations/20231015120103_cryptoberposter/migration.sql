-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "imageName" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "teamLeaderName" TEXT NOT NULL,
    "teamLeaderEmail" TEXT NOT NULL,
    "teamLeaderPhone" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

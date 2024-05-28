-- CreateTable
CREATE TABLE "Movie" (
    "id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "Poster" TEXT NOT NULL,
    "Backdrop" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "release_date" TEXT NOT NULL,
    "genres" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "watched_movies" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "movie_id" BIGINT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'NO VISTO',
    "userId" BIGINT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "See_later" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_movie" BIGINT NOT NULL,

    CONSTRAINT "See_later_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_id_key" ON "Movie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "See_later" ADD CONSTRAINT "See_later_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "See_later" ADD CONSTRAINT "See_later_id_movie_fkey" FOREIGN KEY ("id_movie") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

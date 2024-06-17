import {PrismaClient} from '@prisma/client';
const prisma  = new PrismaClient();

export async function allmovies(){
    return await prisma.movie.findMany();
}
import {PrismaClient} from '@prisma/client';
const prisma  = new PrismaClient();

export async function allmovies(){
    return await prisma.movie.findMany({
        select: {
            title: true,
            original_title: true,
            overview: true,            
            Poster: true,
            Backdrop: true,
            popularity: true,
            release_date: true,
            genres: true,
        },
    });
}
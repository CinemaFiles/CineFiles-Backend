import {PrismaClient} from '@prisma/client';
const prisma  = new PrismaClient();

export async function allmovies(){
    const movies = await prisma.movie.findMany({
        select: {
            id: true,
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
    return movies.map(movie => ({
        ...movie,
        id: movie.id.toString()
    }))
}

export async function findMoviebyId(name: string){
    const idBigInt = BigInt(name);
    return await prisma.movie.findFirst({
        where:{
            id: idBigInt
        },
        select:{
            title: true,
            original_title: true,
            overview: true,
            Poster: true,
            Backdrop: true,
            popularity: true,
            release_date: true,
            genres: true,
        }
    });
}
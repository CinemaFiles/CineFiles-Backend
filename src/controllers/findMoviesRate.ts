import { PrismaClient } from "@prisma/client";
const prisma  = new PrismaClient();


export async function ratemovies(rate: number){
    try{
        const moviesSameRate = await prisma.movie.findMany({
            where:{
                popularity: rate
            }
    })
    return {movies: moviesSameRate, error: null, status: 200}
} catch(error){
    console.error(error);
    return{movies: [], error: "Error del servidor", status: 500}
}
}












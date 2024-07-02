import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addWatchLater (userId:string , movieId : string){
    const watchLater = await prisma.see_later.create({
        data:{
            user_id: BigInt(userId),
            id_movie: BigInt(movieId)
            }
        })
    return watchLater;  
    }

export async function removeWatchLater (userId:string , movieId : string){
    const id_see_later = await prisma.see_later.findFirst({
        where:{
            user_id: BigInt(userId),
            id_movie: BigInt(movieId)
        }
    })
    console.log(id_see_later?.id)
    const watchLater = await prisma.see_later.delete({
       where:{
              id: id_see_later?.id
       }
    })
    return watchLater;
}

//obtener todos los elementos
export async function getallWatchLater(userId:string){
    const watchLater = await prisma.see_later.findMany({
        where:{
            user_id: BigInt(userId)
        }
    })
    return watchLater.map(element => element.id_movie.toString());
}

export const addMovieToWatchLater = async (req: { body: { userId: any; movieId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message?: string; watchLater?: any; error?: string; }): void; new(): any; }; }; }) => {
    const { userId, movieId } = req.body;

    try {
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }

        const watchLater = await prisma.see_later.create({
            data: {
                user_id: userId,
                id_movie: movie.id,
            },
            include: {
                movie: true,
                user: true,
            },
        });

        res.status(200).send({ message: "Movie added to watch later queue", watchLater });
    } catch (error) {
        res.status(500).send({ error: "An error occurred while adding the movie to watch later queue" });
    }
};

export const removeMovieFromWatchLater = async (req: { body: { userId: any; movieId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message?: string; watchLaterEntry?: any; error?: string; }): void; new(): any; }; }; }) => {
    const { userId, movieId } = req.body;

    try {
        const watchLaterEntry = await prisma.see_later.findFirst({
            where: {
                user_id: userId,
                id_movie: movieId,
            },
        });

        if (!watchLaterEntry) {
            return res.status(404).send({ message: "No such movie in watch later queue" });
        }

        await prisma.see_later.delete({
            where: { id: watchLaterEntry.id },
        });

        res.status(200).send({ message: "Movie removed from watch later queue", watchLaterEntry });
    } catch (error) {
        res.status(500).send({ error: "An error occurred while removing the movie from watch later queue" });
    }
};

export const getWatchLaterQueue = async (req: { params: { userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; send: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    const { userId } = req.params;

    try {
        const watchLaterQueue = await prisma.see_later.findMany({
            where: { user_id: BigInt(userId) },
            include: {
                movie: true,
            },
            orderBy: {
                id: 'asc',
            },
        });

        res.status(200).json(watchLaterQueue);
    } catch (error) {
        res.status(500).send({ error: "An error occurred while fetching the watch later queue" });
    }
};
import express from 'express'
import jwt from 'jsonwebtoken';

export async function authMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
){
    console.log('Auth middleware');
    if(!req.headers.authorization){
        res.status(401).send(
            {
                error : 'No autorizado'
            }
        );
        return;
    }

    const splitHeader =  req.headers.authorization.split(' ');
    if(
        splitHeader[0] !== 'Bearer' ||
        splitHeader.length !== 2 ||
        !splitHeader[1]
    ){
        res.status(401).send(
            {
                error : 'No autorizado'
            }
        );
        return;
    }
    const token = splitHeader[1]; // user's jwt
    try{
        jwt.verify(token, process.env.SECRET as string);
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).send(
            {
                error : 'No autorizado'
            }
        );
        return;
    }
}
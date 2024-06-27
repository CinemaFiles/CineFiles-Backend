import {z} from 'zod';

export const searchMovieSchema = z.object({
    filter : z.string({
        required_error: 'El filtro es requerido',
        invalid_type_error: 'El filtro debe ser un string'
    })
})
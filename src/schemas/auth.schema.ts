import {z} from 'zod';

export const createUserSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser un string'
    }).min(2).max(100),
    email: z.string().email({
        message: 'El email no es válido',
    }),
    password: z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un string'
    }).min(6).max(30),
})

export const loginUserSchema = z.object({
    email: z.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser un string'
    }).min(2).max(100),
    password: z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un string'
    }).min(6).max(30),
})

export const getbyId = z.object({
    id: z.number({
            required_error: 'El id es requerido',
            invalid_type_error: 'El id debe ser un número'
    })
})


export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
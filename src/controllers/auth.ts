import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createUserSchema, loginUserSchema } from "../schemas/auth.schema";
import { Hashing, CompareHash } from '../utils/hash';
import jwt from 'jsonwebtoken';

const ONE_MONTH = 30 * 24 * 60 * 60;
const prisma = new PrismaClient();

export async function registerUser(userData: Object) {
  const result = createUserSchema.safeParse(userData);
  if(!result.success){
    return {user: null, error: result.error.formErrors, status: 400};
  }
  const {name, email, password} = result.data;
  const hashedPassword = await Hashing(password);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        mail: email,
        password: hashedPassword
      }
    });
    console.log(user);
    return { user, error: null, status: 200 };
  } 
  catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      // Check if the error is due to duplicate email
      return { user: null, error: "El email ya existe", status: 400 };
    }
    // Server error
    return { user: null, error: "Error del servidor", status: 500 };
  }
}


export async function login(loginData: Object, res: any){
  const validCredential = loginUserSchema.safeParse(loginData);
  if(!validCredential.success){
    return {user: null, error: validCredential.error.formErrors, status: 400};
  }

    console.log({mail: validCredential.data.email});
    const userlogin = await prisma.user.findUnique({
      where: {
        mail: validCredential.data.email,
      }
    })

    if (userlogin) {
      const dato = await CompareHash(validCredential.data.password, userlogin.password);
      if (dato) {
        const dataforToken = {
          id: userlogin.id.toString(),
          name: userlogin.name,
          email: userlogin.mail
        };
        const secretKey = process.env.SECRET ?? "" // Provide a default value for the secret key
        const token = jwt.sign(dataforToken, secretKey,
          {
            expiresIn: ONE_MONTH
          }
        );
        res.status(200).send({userId:userlogin.id as unknown as string, user:userlogin.name, email:userlogin.mail ,  message: "Usuario logueado" , token:token});
        return await prisma.user.findMany();
      }
      else{
        res.status(400).send({message: "Usuario o contraseña incorrectos"});
        return;
      }
    }

    else {
      res.status(400).send({message: "Usuario o contraseña incorrectos"});
      return;
    }
}


export async function getAll (){
  return prisma
}

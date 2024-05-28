import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createUserSchema, loginUserSchema } from "../schemas/auth.schema";
import { Hashing, CompareHash } from '../utils/hash';
import { error } from "console";

const prisma = new PrismaClient();

export async function registerUser(userData: Object) {
  const result = createUserSchema.safeParse(userData);
  if(!result.success){
    return {user: null, error: result.error.formErrors, status: 400};
  }
  const {name, email, password} = result.data;
  const hashedPassword = await Hashing(password);

  try{
    const user = await prisma.user.create({
      data: {
        name,
        mail: email, // Change "email" to "mail"
        password: hashedPassword
      }
    })
    return {user, error: null, status: 200};
  }catch(error){
    if(error instanceof PrismaClientKnownRequestError && error.code === 'P2002'){
      //comprobacion para ver si el error es por email duplicado
      return {user: null, error: "El email ya existe", status: 400};
    }
    //error del servidor
    return {user: null, error: "Error del servidor", status: 500};

  }
}


export async function login(loginData: Object, res: any){
  const validCredential = loginUserSchema.safeParse(loginData);
  if(!validCredential.success){
    return {user: null, error: validCredential.error.formErrors, status: 400};
  }
  const hashedPassword = await Hashing(validCredential.data.password);


    const userlogin = await prisma.user.findUnique({
      where: {
        mail: validCredential.data.email,
        password: hashedPassword
      }
    })
    if(userlogin === null){
      res.status(400).send({message: "Usuario o contraseña incorrectos"});
      return;
    }
    else{
      res.status(200).send({message: "Usuario logueado"});
      return;
    }
}

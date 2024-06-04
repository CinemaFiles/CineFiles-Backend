import express from 'express'
import { registerUser , login, getAll} from '../controllers/auth';
import { createUserSchema, loginUserSchema } from '../schemas/auth.schema';


const router = express.Router(); 

router.post('/login',(req, res) => {
    const validUserLogin = loginUserSchema.safeParse(req.body);
    if(!validUserLogin.success){
        res.status(400).send(validUserLogin.error);
        return;
    }
    login(req.body, res);
    return;
});

router.post('/register', async (req, res) => {
    const validCredential = createUserSchema.safeParse(req.body);
    if (!validCredential.success) {
        res.status(400).send(validCredential.error);
        return;
    }
    const data = await registerUser(req.body);
    res.send({
        user: {
            name: data.user?.name,
            email: data.user?.mail
        },
        error: data.error,
        status: data.status
    });
    return;
});


router.get('/all', (_req, res)=>{
    res.send(getAll());
})

export default router;
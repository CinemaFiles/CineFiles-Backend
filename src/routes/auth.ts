import express from 'express'
import { registerUser , login} from '../controllers/auth';
import { createUserSchema, loginUserSchema } from '../schemas/auth.schema';

const router = express.Router();
router.get('/login',(req, res) => {
    const validUserLogin = loginUserSchema.safeParse(req.body);
    if(!validUserLogin.success){
        res.status(400).send(validUserLogin.error);
        return;
    }
    return login(req.body, res);
});

router.post('/register', (req, res) => {
    const validCredential = createUserSchema.safeParse(req.body);
    if (!validCredential.success){
        res.status(400).send(validCredential.error);
    }    
    return registerUser(req.body);
});

export default router;
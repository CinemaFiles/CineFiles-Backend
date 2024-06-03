import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth'
import movies from './routes/movies'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());//midleware para parsear todo a json
app.use(morgan('dev'));


app.use('/auth', authRouter);

app.use('/movies', movies);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


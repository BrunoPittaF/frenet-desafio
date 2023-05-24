import express from 'express';
import { router as usersRouter } from './routes/users';
import { urlencoded } from 'body-parser';
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(urlencoded({ extended: true }));
app.use('/api', usersRouter);


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});



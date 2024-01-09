import express, { Request, Response } from 'express';
import cors from 'cors'
import "dotenv/config";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL as string);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req: Request, res: Response) => {
  res.json({ message: `Express Server Running http://localhost:${process.env.PORT || 7000}` });
});

app.listen(process.env.PORT || 7000, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT || 7000}`);
})
import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

await mongoose.connect('');

app.set('port', PORT);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});

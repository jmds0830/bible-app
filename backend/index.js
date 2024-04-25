import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { bookToIdMap } from '../frontend/src/components/BookToIdMap.js';

const app = express();
const PORT = process.env.PORT || 3000;

await mongoose.connect('mongodb://localhost:27017/bible-app');

app.set('port', PORT);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await fetch(
      'https://bible-go-api.rkeplin.com/v1/translations'
    );
    const translations = await response.json();

    res.status(200).json({
      message: 'Successfully fetched data.',
      translations,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching translation data.',
      error: error.message,
    });
  }
});

app.get('/:abbreviation', async (req, res) => {
  const { abbreviation } = req.params;
  try {
    const response = await fetch(
      `https://bible-go-api.rkeplin.com/v1/books?translation=${abbreviation}`
    );
    const books = await response.json();

    res.status(200).json({
      message: 'Successfully fetched data.',
      books,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching book data.',
    });
  }
});

app.get('/:abbreviation/:bookName', async (req, res) => {
  const { bookName, abbreviation } = req.params;
  try {
    const bookId = bookToIdMap[bookName];
    if (!bookId) {
      throw new Error('Book not found');
    }

    const response = await fetch(
      `https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters?translation=${abbreviation}`
    );
    const chapters = await response.json();

    res.status(200).json({
      message: 'Successfully fetched data.',
      chapters,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching chapter data.',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});

import express from 'express';
import { connectToDatabase } from './db/dbConnection';
import dotenv from 'dotenv';
import countryRouter from './router/countryRouter';
import cityRouter from './router/cityRouter';
import guideRouter from './router/guideRouter';
import guideLanguageRouter from './router/guideLanguageRouter';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json()); // JSON gövdelerini işlemek için

// Connect to the database
connectToDatabase();

// Use the routes
app.use('/api', countryRouter);
app.use('/api', cityRouter);
app.use('/api', guideRouter);
app.use('/api', guideLanguageRouter);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
import express from 'express';
import { connectToDatabase } from './db/dbConnection';
import dotenv from 'dotenv';
import cors from 'cors';
import countryRouter from './router/countryRouter';
import cityRouter from './router/cityRouter';
import guideRouter from './router/guideRouter';
import guideLanguageRouter from './router/guideLanguageRouter';
import flightRouter from './router/flightRouter';
import routeRouter from './router/routeRouter';
import planeRouter from './router/planeRouter';
import hotelRouter from './router/hotelRouter';
import passengerRouter from './router/passengerRouter';
import passengerAddressRouter from './router/passengerAddressRouter';
import routeCityRouter from './router/routeCityRouter';
import tourRouter from './router/tourRouter';
import tourHotelRouter from './router/tourHotelRouter';
import reservationRouter from './router/reservationRouter';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
})); // CORS ayarlarını ekleyin
app.use(express.json()); // JSON gövdelerini işlemek için

// Connect to the database
connectToDatabase();

// Use the routes
app.use('/api', countryRouter);
app.use('/api', cityRouter);
app.use('/api', guideRouter);
app.use('/api', guideLanguageRouter);
app.use('/api', flightRouter);
app.use('/api', routeRouter);
app.use('/api', planeRouter);
app.use('/api', hotelRouter);
app.use('/api', passengerRouter);
app.use('/api', passengerAddressRouter);
app.use('/api', routeCityRouter);
app.use('/api', tourRouter);
app.use('/api', tourHotelRouter);
app.use('/api', reservationRouter);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
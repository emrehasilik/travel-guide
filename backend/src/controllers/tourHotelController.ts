import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllTourHotels = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Tur_Otel";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getTourHotelById = (req: Request, res: Response) => {
    const tourId = req.params.tourId;
    const hotelId = req.params.hotelId;
    const query = `SELECT * FROM TurRehber.Tur_Otel WHERE TurID = ${tourId} AND OtelID = ${hotelId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createTourHotel = (req: Request, res: Response) => {
    const { TurID, OtelID, KonaklamaGunSayisi } = req.body;
    const query = `INSERT INTO TurRehber.Tur_Otel (TurID, OtelID, KonaklamaGunSayisi) VALUES (${TurID}, ${OtelID}, ${KonaklamaGunSayisi})`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Tour hotel successfully added');
        }
    });
};

export const updateTourHotel = (req: Request, res: Response) => {
    const tourId = req.params.tourId;
    const hotelId = req.params.hotelId;
    const { KonaklamaGunSayisi } = req.body;
    const query = `UPDATE TurRehber.Tur_Otel SET KonaklamaGunSayisi = ${KonaklamaGunSayisi} WHERE TurID = ${tourId} AND OtelID = ${hotelId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Tour hotel successfully updated');
        }
    });
};

export const deleteTourHotel = (req: Request, res: Response) => {
    const tourId = req.params.tourId;
    const hotelId = req.params.hotelId;
    const query = `DELETE FROM TurRehber.Tur_Otel WHERE TurID = ${tourId} AND OtelID = ${hotelId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Tour hotel successfully deleted');
        }
    });
};
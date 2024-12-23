import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllHotels = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Otel";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getHotelById = (req: Request, res: Response) => {
    const hotelId = req.params.id;
    const query = `SELECT * FROM TurRehber.Otel WHERE OtelID = ${hotelId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createHotel = (req: Request, res: Response) => {
    const { OtelAdi, SehirID, YildizSayisi, Aciklama } = req.body;
    const query = `INSERT INTO TurRehber.Otel (OtelAdi, SehirID, YildizSayisi, Aciklama) VALUES ('${OtelAdi}', ${SehirID}, ${YildizSayisi}, '${Aciklama}')`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Hotel successfully added');
        }
    });
};

export const updateHotel = (req: Request, res: Response) => {
    const hotelId = req.params.id;
    const { OtelAdi, SehirID, YildizSayisi, Aciklama } = req.body;
    const query = `UPDATE TurRehber.Otel SET OtelAdi = '${OtelAdi}', SehirID = ${SehirID}, YildizSayisi = ${YildizSayisi}, Aciklama = '${Aciklama}' WHERE OtelID = ${hotelId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Hotel successfully updated');
        }
    });
};

export const deleteHotel = (req: Request, res: Response) => {
    const hotelId = req.params.id;
    const query = `DELETE FROM TurRehber.Otel WHERE OtelID = ${hotelId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Hotel successfully deleted');
        }
    });
};
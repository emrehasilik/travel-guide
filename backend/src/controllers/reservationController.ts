import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllReservations = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Rezervasyon";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getReservationById = (req: Request, res: Response) => {
    const reservationId = req.params.id;
    const query = `SELECT * FROM TurRehber.Rezervasyon WHERE RezervasyonID = ${reservationId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createReservation = (req: Request, res: Response) => {
    const { TurID, YolcuID, RezervasyonTarihi, OdemeDurumu, ToplamUcret, DovizCinsi } = req.body;
    const query = `INSERT INTO TurRehber.Rezervasyon (TurID, YolcuID, RezervasyonTarihi, OdemeDurumu, ToplamUcret, DovizCinsi) VALUES (${TurID}, ${YolcuID}, '${RezervasyonTarihi}', '${OdemeDurumu}', ${ToplamUcret}, '${DovizCinsi}')`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Reservation successfully added');
        }
    });
};

export const updateReservation = (req: Request, res: Response) => {
    const reservationId = req.params.id;
    const { TurID, YolcuID, RezervasyonTarihi, OdemeDurumu, ToplamUcret, DovizCinsi } = req.body;
    const query = `UPDATE TurRehber.Rezervasyon SET TurID = ${TurID}, YolcuID = ${YolcuID}, RezervasyonTarihi = '${RezervasyonTarihi}', OdemeDurumu = '${OdemeDurumu}', ToplamUcret = ${ToplamUcret}, DovizCinsi = '${DovizCinsi}' WHERE RezervasyonID = ${reservationId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Reservation successfully updated');
        }
    });
};

export const deleteReservation = (req: Request, res: Response) => {
    const reservationId = req.params.id;
    const query = `DELETE FROM TurRehber.Rezervasyon WHERE RezervasyonID = ${reservationId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Reservation successfully deleted');
        }
    });
};
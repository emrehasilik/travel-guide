import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllFlights = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Ucus";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getFlightById = (req: Request, res: Response) => {
    const flightId = req.params.id;
    const query = `SELECT * FROM TurRehber.Ucus WHERE UcusID = ${flightId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createFlight = (req: Request, res: Response) => {
    const { KalkisSehirID, VarisSehirID, HavayoluSirketi, UcusTarihi, UcusSaati, Fiyat } = req.body;
    const query = `INSERT INTO TurRehber.Ucus (KalkisSehirID, VarisSehirID, HavayoluSirketi, UcusTarihi, UcusSaati, Fiyat) VALUES (${KalkisSehirID}, ${VarisSehirID}, '${HavayoluSirketi}', '${UcusTarihi}', '${UcusSaati}', ${Fiyat})`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Flight successfully added');
        }
    });
};

export const updateFlight = (req: Request, res: Response) => {
    const flightId = req.params.id;
    const { KalkisSehirID, VarisSehirID, HavayoluSirketi, UcusTarihi, UcusSaati, Fiyat } = req.body;
    const query = `UPDATE TurRehber.Ucus SET KalkisSehirID = ${KalkisSehirID}, VarisSehirID = ${VarisSehirID}, HavayoluSirketi = '${HavayoluSirketi}', UcusTarihi = '${UcusTarihi}', UcusSaati = '${UcusSaati}', Fiyat = ${Fiyat} WHERE UcusID = ${flightId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Flight successfully updated');
        }
    });
};

export const deleteFlight = (req: Request, res: Response) => {
    const flightId = req.params.id;
    const query = `DELETE FROM TurRehber.Ucus WHERE UcusID = ${flightId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Flight successfully deleted');
        }
    });
};
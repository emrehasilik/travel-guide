import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllPlanes = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Ucak";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getPlaneById = (req: Request, res: Response) => {
    const planeId = req.params.id;
    const query = `SELECT * FROM TurRehber.Ucak WHERE UcakID = ${planeId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createPlane = (req: Request, res: Response) => {
    const { UcakAdi } = req.body;
    const query = `INSERT INTO TurRehber.Ucak (UcakAdi) VALUES ('${UcakAdi}')`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Plane successfully created');
        }
    });
};

export const updatePlane = (req: Request, res: Response) => {
    const planeId = req.params.id;
    const { UcakAdi } = req.body;
    const query = `UPDATE TurRehber.Ucak SET UcakAdi = '${UcakAdi}' WHERE UcakID = ${planeId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Plane successfully updated');
        }
    });
};

export const deletePlane = (req: Request, res: Response) => {
    const planeId = req.params.id;
    const query = `DELETE FROM TurRehber.Ucak WHERE UcakID = ${planeId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Plane successfully deleted');
        }
    });
};
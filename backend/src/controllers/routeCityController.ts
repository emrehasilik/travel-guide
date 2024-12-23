import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllRouteCities = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Rota_Sehir";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getRouteCityById = (req: Request, res: Response) => {
    const routeId = req.params.routeId;
    const cityId = req.params.cityId;
    const query = `SELECT * FROM TurRehber.Rota_Sehir WHERE RotaID = ${routeId} AND SehirID = ${cityId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createRouteCity = (req: Request, res: Response) => {
    const { RotaID, SehirID, SiraNo } = req.body;
    const query = `INSERT INTO TurRehber.Rota_Sehir (RotaID, SehirID, SiraNo) VALUES (${RotaID}, ${SehirID}, ${SiraNo})`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Route city successfully added');
        }
    });
};

export const updateRouteCity = (req: Request, res: Response) => {
    const routeId = req.params.routeId;
    const cityId = req.params.cityId;
    const { SiraNo } = req.body;
    const query = `UPDATE TurRehber.Rota_Sehir SET SiraNo = ${SiraNo} WHERE RotaID = ${routeId} AND SehirID = ${cityId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Route city successfully updated');
        }
    });
};

export const deleteRouteCity = (req: Request, res: Response) => {
    const routeId = req.params.routeId;
    const cityId = req.params.cityId;
    const query = `DELETE FROM TurRehber.Rota_Sehir WHERE RotaID = ${routeId} AND SehirID = ${cityId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Route city successfully deleted');
        }
    });
};
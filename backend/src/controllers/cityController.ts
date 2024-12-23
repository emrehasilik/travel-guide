import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllCities = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Sehir";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getCityById = (req: Request, res: Response) => {
    const cityId = req.params.id;
    const query = `SELECT * FROM TurRehber.Sehir WHERE SehirID = ${cityId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};
export const createCity = (req: Request, res: Response) => {
    const { SehirAdi, UlkeID, SehirKodu, Nufus, Aciklama } = req.body;
    const query = `INSERT INTO TurRehber.Sehir (SehirAdi, UlkeID, SehirKodu, Nufus, Aciklama) VALUES ('${SehirAdi}', ${UlkeID}, '${SehirKodu}', ${Nufus}, '${Aciklama}')`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('City successfully added');
        }
    });
};

export const updateCity = (req: Request, res: Response) => {
    const cityId = req.params.id;
    const { SehirAdi, UlkeID, SehirKodu, Nufus, Aciklama } = req.body;
    const query = `UPDATE TurRehber.Sehir SET SehirAdi = '${SehirAdi}', UlkeID = ${UlkeID}, SehirKodu = '${SehirKodu}', Nufus = ${Nufus}, Aciklama = '${Aciklama}' WHERE SehirID = ${cityId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('City successfully updated');
        }
    });
};

export const deleteCity = (req: Request, res: Response) => {
    const cityId = req.params.id;
    const query = `DELETE FROM TurRehber.Sehir WHERE SehirID = ${cityId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('City successfully deleted');
        }
    });
};
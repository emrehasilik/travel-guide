import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllCountries = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Ulke";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getCountryById = (req: Request, res: Response) => {
    const countryId = req.params.id;
    const query = `SELECT * FROM TurRehber.Ulke WHERE UlkeID = ${countryId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createCountry = (req: Request, res: Response) => {
    const { UlkeAdi, UlkeKodu, Aciklama } = req.body;
    const query = `INSERT INTO TurRehber.Ulke (UlkeAdi, UlkeKodu, Aciklama) VALUES ('${UlkeAdi}', '${UlkeKodu}', '${Aciklama}')`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Country successfully added');
        }
    });
};

export const updateCountry = (req: Request, res: Response) => {
    const countryId = req.params.id;
    const { UlkeAdi, UlkeKodu, Aciklama } = req.body;
    const query = `UPDATE TurRehber.Ulke SET UlkeAdi = '${UlkeAdi}', UlkeKodu = '${UlkeKodu}', Aciklama = '${Aciklama}' WHERE UlkeID = ${countryId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Country successfully updated');
        }
    });
};

export const deleteCountry = (req: Request, res: Response) => {
    const countryId = req.params.id;
    const query = `DELETE FROM TurRehber.Ulke WHERE UlkeID = ${countryId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Country successfully deleted');
        }
    });
};
import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllRoutes = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Rota";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getRouteById = (req: Request, res: Response) => {
    const routeId = req.params.id;
    const query = `SELECT * FROM TurRehber.Rota WHERE RotaID = ${routeId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createRoute = (req: Request, res: Response) => {
    const { RotaAdi, Aciklama, AktifMi } = req.body;
    const query = `INSERT INTO TurRehber.Rota (RotaAdi, Aciklama, AktifMi) VALUES ('${RotaAdi}', '${Aciklama}', ${AktifMi})`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Route successfully created');
        }
    });
};

export const updateRoute = (req: Request, res: Response) => {
    const routeId = req.params.id;
    const { RotaAdi, Aciklama, AktifMi } = req.body;
    const query = `UPDATE TurRehber.Rota SET RotaAdi = '${RotaAdi}', Aciklama = '${Aciklama}', AktifMi = ${AktifMi}, UpdateDate = GETDATE() WHERE RotaID = ${routeId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Route successfully updated');
        }
    });
};

export const deleteRoute = (req: Request, res: Response) => {
    const routeId = req.params.id;
    const query = `DELETE FROM TurRehber.Rota WHERE RotaID = ${routeId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Route successfully deleted');
        }
    });
};
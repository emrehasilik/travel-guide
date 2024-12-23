import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllPassengerAddresses = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Yolcu_Adres";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getPassengerAddressById = (req: Request, res: Response) => {
    const addressId = req.params.id;
    const query = `SELECT * FROM TurRehber.Yolcu_Adres WHERE YolcuAdresID = ${addressId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createPassengerAddress = (req: Request, res: Response) => {
    const { YolcuID, AdresSatiri1, AdresSatiri2, SehirID, PostaKodu, UlkeID } = req.body;
    const query = `INSERT INTO TurRehber.Yolcu_Adres (YolcuID, AdresSatiri1, AdresSatiri2, SehirID, PostaKodu, UlkeID) VALUES (${YolcuID}, '${AdresSatiri1}', '${AdresSatiri2}', ${SehirID}, '${PostaKodu}', ${UlkeID})`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Passenger address successfully added');
        }
    });
};

export const updatePassengerAddress = (req: Request, res: Response) => {
    const addressId = req.params.id;
    const { YolcuID, AdresSatiri1, AdresSatiri2, SehirID, PostaKodu, UlkeID } = req.body;
    const query = `UPDATE TurRehber.Yolcu_Adres SET YolcuID = ${YolcuID}, AdresSatiri1 = '${AdresSatiri1}', AdresSatiri2 = '${AdresSatiri2}', SehirID = ${SehirID}, PostaKodu = '${PostaKodu}', UlkeID = ${UlkeID} WHERE YolcuAdresID = ${addressId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Passenger address successfully updated');
        }
    });
};

export const deletePassengerAddress = (req: Request, res: Response) => {
    const addressId = req.params.id;
    const query = `DELETE FROM TurRehber.Yolcu_Adres WHERE YolcuAdresID = ${addressId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Passenger address successfully deleted');
        }
    });
};
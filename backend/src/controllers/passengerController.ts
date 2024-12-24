import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllPassengers = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Yolcu";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getPassengerById = (req: Request, res: Response) => {
    const passengerId = req.params.id;
    const query = `SELECT * FROM TurRehber.Yolcu WHERE YolcuID = ${passengerId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createPassenger = (req: Request, res: Response) => {
    const { Ad, Soyad, Email, Telefon, Cinsiyet, DogumTarihi, PasaportNo, UlkeID } = req.body;
    const query = `INSERT INTO TurRehber.Yolcu (Ad, Soyad, Email, Telefon, Cinsiyet, DogumTarihi, PasaportNo, UlkeID) VALUES ('${Ad}', '${Soyad}', '${Email}', '${Telefon}', '${Cinsiyet}', '${DogumTarihi}', '${PasaportNo}', ${UlkeID})`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Passenger successfully added');
        }
    });
};

export const updatePassenger = (req: Request, res: Response) => {
    const passengerId = req.params.id;
    const { Ad, Soyad, Email, Telefon, Cinsiyet, DogumTarihi, PasaportNo, UlkeID } = req.body;
    const query = `UPDATE TurRehber.Yolcu SET Ad = '${Ad}', Soyad = '${Soyad}', Email = '${Email}', Telefon = '${Telefon}', Cinsiyet = '${Cinsiyet}', DogumTarihi = '${DogumTarihi}', PasaportNo = '${PasaportNo}', UlkeID = ${UlkeID} WHERE YolcuID = ${passengerId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Passenger successfully updated');
        }
    });
};

export const deletePassenger = (req: Request, res: Response) => {
    const passengerId = req.params.id;
  
    // Önce adresleri sil
    const deleteAddressesQuery = `DELETE FROM TurRehber.Yolcu_Adres WHERE YolcuID = ?`;
    sql.query(connectionString, deleteAddressesQuery, [passengerId], (err: any) => {
      if (err) {
        console.error('Error deleting passenger addresses:', err);
        return res.status(500).send('Error deleting passenger addresses.');
      }
  
      // Adresler silindikten sonra yolcuyu sil
      const deletePassengerQuery = `DELETE FROM TurRehber.Yolcu WHERE YolcuID = ?`;
      sql.query(connectionString, deletePassengerQuery, [passengerId], (err: any, result: any) => {
        if (err) {
          console.error('Error deleting passenger:', err);
          return res.status(500).send('Error deleting passenger.');
        }
  
        res.send('Passenger and related addresses successfully deleted.');
      });
    });
  };
  
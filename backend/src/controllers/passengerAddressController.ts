import { RequestHandler, Request, Response , NextFunction } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;
export const getAllPassengerAddresses = (req: Request, res: Response) => {
    const query = `
      SELECT
        a.YolcuAdresID,
        a.YolcuID,
        a.AdresSatiri1,
        a.AdresSatiri2,
        s.SehirAdi,
        u.UlkeAdi,
        a.PostaKodu
      FROM TurRehber.Yolcu_Adres a
      INNER JOIN TurRehber.Sehir s ON a.SehirID = s.SehirID
      INNER JOIN TurRehber.Ulke u ON s.UlkeID = u.UlkeID
    `;
  
    sql.query(connectionString, query, (err: any, rows: any) => {
      if (err) {
        console.error('Error fetching addresses:', err);
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

export const createPassengerAddress: RequestHandler = (req, res) => {
    const { YolcuID, SehirAdi, AdresSatiri1, AdresSatiri2, PostaKodu } = req.body;
  
    if (!YolcuID || !SehirAdi || !AdresSatiri1) {
      res.status(400).send('YolcuID, SehirAdi ve AdresSatiri1 gerekli alanlardır.');
      return; // Fonksiyondan çık
    }
  
    const selectCityQuery = `
      SELECT SehirID, UlkeID
      FROM TurRehber.Sehir
      WHERE SehirAdi = ?;
    `;
    const selectCityParams = [SehirAdi];
  
    sql.query(connectionString, selectCityQuery, selectCityParams, (err: any, cityRows: any) => {
      if (err) {
        console.error('Error during select city:', err);
        res.status(500).send('Database error (select city)');
        return; // Fonksiyondan çık
      }
  
      if (!cityRows || cityRows.length === 0) {
        res.status(404).send(`Şehir '${SehirAdi}' bulunamadı.`);
        return; // Fonksiyondan çık
      }
  
      const foundCity = cityRows[0];
      const foundSehirID = foundCity.SehirID;
      const foundUlkeID = foundCity.UlkeID;
  
      const insertQuery = `
        INSERT INTO TurRehber.Yolcu_Adres 
          (YolcuID, AdresSatiri1, AdresSatiri2, SehirID, PostaKodu, UlkeID)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      const insertParams = [
        YolcuID,
        AdresSatiri1,
        AdresSatiri2 || null,
        foundSehirID,
        PostaKodu || '',
        foundUlkeID,
      ];
  
      sql.query(connectionString, insertQuery, insertParams, (errInsert: any) => {
        if (errInsert) {
          console.error('Error during insert address:', errInsert);
          res.status(500).send('Database error (insert address)');
          return; // Fonksiyondan çık
        }
        res.status(201).send('Passenger address successfully added');
      });
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
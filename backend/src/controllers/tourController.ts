import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllTours = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Tur";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getTourById = (req: Request, res: Response) => {
    const tourId = req.params.id;
    const query = `SELECT * FROM TurRehber.Tur WHERE TurID = ${tourId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createTour = (req: Request, res: Response) => {
    const { TurAdi, BaslangicTarihi, BitisTarihi, RotaID, RehberID, UcakID, TurTuru, Fiyat, DovizCinsi, Kontenjan, Aciklama, AktifMi } = req.body;
    const aktifMiValue = AktifMi ? 1 : 0; // true/false yerine 1/0 kullanın
    const query = `INSERT INTO TurRehber.Tur (TurAdi, BaslangicTarihi, BitisTarihi, RotaID, RehberID, UcakID, TurTuru, Fiyat, DovizCinsi, Kontenjan, Aciklama, AktifMi) 
                   VALUES ('${TurAdi}', '${BaslangicTarihi}', '${BitisTarihi}', ${RotaID}, ${RehberID}, ${UcakID}, '${TurTuru}', ${Fiyat}, '${DovizCinsi}', ${Kontenjan}, '${Aciklama}', ${aktifMiValue})`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send(`Database error: ${err.message}`);
        } else {
            res.send('Tour successfully created');
        }
    });
};

export const updateTour = (req: Request, res: Response) => {
    const tourId = req.params.id;
    const { TurAdi, BaslangicTarihi, BitisTarihi, RotaID, RehberID, UcakID, TurTuru, Fiyat, DovizCinsi, Kontenjan, Aciklama, AktifMi } = req.body;
    const aktifMiValue = AktifMi ? 1 : 0; // true/false yerine 1/0 kullanın
    const query = `UPDATE TurRehber.Tur SET TurAdi = '${TurAdi}', BaslangicTarihi = '${BaslangicTarihi}', BitisTarihi = '${BitisTarihi}', RotaID = ${RotaID}, RehberID = ${RehberID}, UcakID = ${UcakID}, TurTuru = '${TurTuru}', Fiyat = ${Fiyat}, DovizCinsi = '${DovizCinsi}', Kontenjan = ${Kontenjan}, Aciklama = '${Aciklama}', AktifMi = ${aktifMiValue}, UpdateDate = GETDATE() WHERE TurID = ${tourId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send(`Database error: ${err.message}`);
        } else {
            res.send('Tour successfully updated');
        }
    });
};

export const deleteTour = (req: Request, res: Response) => {
    const tourId = req.params.id;
    const query = `DELETE FROM TurRehber.Tur WHERE TurID = ${tourId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send(`Database error: ${err.message}`);
        } else {
            res.send('Tour successfully deleted');
        }
    });
};
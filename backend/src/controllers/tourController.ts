import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';
import { FORMERR } from 'dns';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllTours = (req: Request, res: Response) => {
    const query = `
        SELECT 
            t.TurID,
            t.TurAdi,
            t.BaslangicTarihi,
            t.BitisTarihi,
            t.TurTuru,
            t.Fiyat,
            t.DovizCinsi,
            t.Kontenjan,
            t.Aciklama,
            t.AktifMi,
            r.RotaAdi,
            reh.Ad AS RehberAdi,
            reh.Soyad AS RehberSoyadi,
            u.UcakFirmaAdi,
            u.UcakModeli
        FROM 
            TurRehber.Tur t
        JOIN 
            TurRehber.Rota r ON t.RotaID = r.RotaID
        JOIN 
            TurRehber.Rehber reh ON t.RehberID = reh.RehberID
        LEFT JOIN 
            TurRehber.Ucak u ON t.UcakID = u.UcakID
    `;
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
    const query = `
        SELECT 
            t.TurID,
            t.TurAdi,
            t.BaslangicTarihi,
            t.BitisTarihi,
            t.TurTuru,
            t.Fiyat,
            t.DovizCinsi,
            t.Kontenjan,
            t.Aciklama,
            t.AktifMi,
            r.RotaAdi,
            reh.Ad AS RehberAdi,
            reh.Soyad AS RehberSoyadi,
            u.UcakFirmaAdi
        FROM 
            TurRehber.Tur t
        LEFT JOIN 
            TurRehber.Rota r ON t.RotaID = r.RotaID
        LEFT JOIN 
            TurRehber.Rehber reh ON t.RehberID = reh.RehberID
        LEFT JOIN 
            TurRehber.Ucak u ON t.UcakID = u.UcakID
        WHERE 
            t.TurID = ${tourId};
    `;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows[0]); // Sadece ilgili turu döndür
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
    const {
      TurAdi,
      BaslangicTarihi,
      BitisTarihi,
      RotaID,
      RehberID,
      UcakID,
      TurTuru,
      Fiyat,
      DovizCinsi,
      Kontenjan,
      Aciklama,
      AktifMi,
    } = req.body;

    // Boolean değerleri DB'de 1/0 tutuyorsanız:
    const aktifMiValue = AktifMi ? 1 : 0; 

    const query = `
      UPDATE TurRehber.Tur
      SET
        TurAdi          = '${TurAdi}',
        BaslangicTarihi = '${BaslangicTarihi}',
        BitisTarihi     = '${BitisTarihi}',
        RotaID          = ${RotaID},
        RehberID        = ${RehberID},
        UcakID          = ${UcakID},
        TurTuru         = '${TurTuru}',
        Fiyat           = ${Fiyat},
        DovizCinsi      = '${DovizCinsi}',
        Kontenjan       = ${Kontenjan},
        Aciklama        = '${Aciklama}',
        AktifMi         = ${aktifMiValue},
        UpdateDate      = GETDATE()
      WHERE
        TurID = ${tourId};
    `;

    sql.query(connectionString, query, (err: any) => {
        if (err) {
            console.error('Error during database query:', err);
            return res.status(500).send(`Database error: ${err.message}`);
        }

        // Güncelleme başarılı olduğu için, şimdi güncellenmiş veriyi tekrar çekip öyle dönelim.
        const selectQuery = `SELECT * FROM TurRehber.Tur WHERE TurID = ${tourId}`;

        sql.query(connectionString, selectQuery, (err2: any, updatedRows: any) => {
            if (err2) {
                console.error('Error during select query:', err2);
                return res.status(500).send(`Database error: ${err2.message}`);
            }

    
            // Frontend bunu handle edebilir.
            const updatedTour = updatedRows && updatedRows.length > 0 ? updatedRows[0] : null;

            // Artık json olarak dönebiliriz.
            res.json(updatedTour);
        });
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
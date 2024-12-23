import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllGuides = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Rehber";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getGuideById = (req: Request, res: Response) => {
    const guideId = req.params.id;
    const query = `SELECT * FROM TurRehber.Rehber WHERE RehberID = ${guideId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createGuide = (req: Request, res: Response) => {
    const { Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller } = req.body;
    const insertGuideQuery = `INSERT INTO TurRehber.Rehber (Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili) VALUES ('${Ad}', '${Soyad}', '${Telefon}', '${Email}', '${Cinsiyet}', ${DeneyimYili}); SELECT SCOPE_IDENTITY() AS RehberID;`;

    sql.query(connectionString, insertGuideQuery, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            const rehberID = result[0].RehberID;
            const insertLanguageQueries = Diller.map((dil: string) => `INSERT INTO TurRehber.Rehber_Dil (RehberID, Dil) VALUES (${rehberID}, '${dil}');`).join(' ');

            sql.query(connectionString, insertLanguageQueries, (err: any) => {
                if (err) {
                    console.error('Error during database query:', err);
                    res.status(500).send('Database error');
                } else {
                    res.status(201).json({ RehberID: rehberID, Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller });
                }
            });
        }
    });
};

export const updateGuide = (req: Request, res: Response) => {
    const guideId = req.params.id;
    const { Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili } = req.body;
    const query = `UPDATE TurRehber.Rehber SET Ad = '${Ad}', Soyad = '${Soyad}', Telefon = '${Telefon}', Email = '${Email}', Cinsiyet = '${Cinsiyet}', DeneyimYili = ${DeneyimYili} WHERE RehberID = ${guideId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Guide successfully updated');
        }
    });
};

export const deleteGuide = (req: Request, res: Response) => {
    const guideId = req.params.id;
    const query = `DELETE FROM TurRehber.Rehber WHERE RehberID = ${guideId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Guide successfully deleted');
        }
    });
};
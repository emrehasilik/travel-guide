import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

function executeQuery(query: string, params: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, query, params, (err: any, rows: any[] | undefined) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows || []);
            }
        });
    });
}

export const getAllGuides = async (req: Request, res: Response) => {
    const query = `
        SELECT
            r.RehberID,
            r.Ad,
            r.Soyad,
            r.Telefon,
            r.Email,
            r.Cinsiyet,
            r.DeneyimYili,
            r.CreateDate,
            r.UpdateDate,
            STRING_AGG(rd.Dil, ',') AS Diller
        FROM TurRehber.Rehber r
        LEFT JOIN TurRehber.Rehber_Dil rd ON r.RehberID = rd.RehberID
        GROUP BY
            r.RehberID,
            r.Ad,
            r.Soyad,
            r.Telefon,
            r.Email,
            r.Cinsiyet,
            r.DeneyimYili,
            r.CreateDate,
            r.UpdateDate;
    `;

    try {
        const rows = await executeQuery(query, []);
        const guides = rows.map(row => ({
            ...row,
            Diller: row.Diller ? row.Diller.split(',') : []
        }));
        res.json(guides);
    } catch (err) {
        console.error('Error during database query:', err);
        res.status(500).send('Database error');
    }
};

export const getGuideById = async (req: Request, res: Response) => {
    const guideId = req.params.id;
    const query = `
        SELECT
            r.RehberID,
            r.Ad,
            r.Soyad,
            r.Telefon,
            r.Email,
            r.Cinsiyet,
            r.DeneyimYili,
            r.CreateDate,
            r.UpdateDate,
            STRING_AGG(rd.Dil, ',') AS Diller
        FROM TurRehber.Rehber r
        LEFT JOIN TurRehber.Rehber_Dil rd ON r.RehberID = rd.RehberID
        WHERE r.RehberID = ?
        GROUP BY
            r.RehberID,
            r.Ad,
            r.Soyad,
            r.Telefon,
            r.Email,
            r.Cinsiyet,
            r.DeneyimYili,
            r.CreateDate,
            r.UpdateDate;
    `;

    try {
        const rows = await executeQuery(query, [guideId]);
        if (rows.length === 0) {
            res.status(404).send('Guide not found');
            return;
        }
        const guide = {
            ...rows[0],
            Diller: rows[0].Diller ? rows[0].Diller.split(',') : []
        };
        res.json(guide);
    } catch (err) {
        console.error('Error during database query:', err);
        res.status(500).send('Database error');
    }
};

export const createGuide = async (req: Request, res: Response): Promise<void> => {
    const { Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller } = req.body;

    const guideQuery = `
        INSERT INTO TurRehber.Rehber (Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili)
        OUTPUT INSERTED.RehberID
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const guideParams = [Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili];

    try {
        const result = await executeQuery(guideQuery, guideParams);
        const newGuideId = result[0].RehberID;

        if (Diller && Diller.length > 0) {
            const languageQueries = Diller.map((dil: string) => {
                const languageQuery = `
                    INSERT INTO TurRehber.Rehber_Dil (RehberID, Dil)
                    VALUES (?, ?)
                `;
                return executeQuery(languageQuery, [newGuideId, dil]);
            });

            await Promise.all(languageQueries);
        }

        res.status(201).json({ RehberID: newGuideId, Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller });
    } catch (err) {
        console.error('Error during database query:', err);
        res.status(500).send('Database error');
    }
};

export const updateGuide = async (req: Request, res: Response): Promise<void> => {
    const guideId = req.params.id;
    const { Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller } = req.body;

    const updateGuideQuery = `
        UPDATE TurRehber.Rehber
        SET Ad = ?, Soyad = ?, Telefon = ?, Email = ?, Cinsiyet = ?, DeneyimYili = ?
        WHERE RehberID = ?
    `;

    try {
        await executeQuery(updateGuideQuery, [Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, guideId]);

        const deleteLanguagesQuery = `
            DELETE FROM TurRehber.Rehber_Dil
            WHERE RehberID = ?
        `;
        await executeQuery(deleteLanguagesQuery, [guideId]);

        if (Diller && Diller.length > 0) {
            const languageQueries = Diller.map((dil: string) => {
                const languageQuery = `
                    INSERT INTO TurRehber.Rehber_Dil (RehberID, Dil)
                    VALUES (?, ?)
                `;
                return executeQuery(languageQuery, [guideId, dil]);
            });
            await Promise.all(languageQueries);
        }

        res.status(200).send('Guide successfully updated');
    } catch (err) {
        console.error('Error during database query:', err);
        res.status(500).send('Database error');
    }
};

export const deleteGuide = async (req: Request, res: Response): Promise<void> => {
    const guideId = req.params.id;

    const deleteLanguagesQuery = `
        DELETE FROM TurRehber.Rehber_Dil
        WHERE RehberID = ?
    `;

    const deleteGuideQuery = `
        DELETE FROM TurRehber.Rehber
        WHERE RehberID = ?
    `;

    try {
        await executeQuery(deleteLanguagesQuery, [guideId]);
        await executeQuery(deleteGuideQuery, [guideId]);
        res.send('Guide and associated languages successfully deleted');
    } catch (err) {
        console.error('Error during database query:', err);
        res.status(500).send('Database error');
    }
};
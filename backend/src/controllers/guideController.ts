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
    const query = `SELECT * FROM TurRehber.Rehber WHERE Rehberd}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const createGuide = async (req: Request, res: Response): Promise<void> => {
    console.log('CreateGuide endpoint called');
    const { Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller } = req.body;

    console.log('Request body:', { Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili, Diller });

    if (!Ad || !Soyad || !Telefon || !Email || !Cinsiyet || !DeneyimYili || !Diller) {
        console.error('Validation failed: Missing fields');
        res.status(400).send('All fields are required');
        return;
    }

    const insertGuideQuery = `
        INSERT INTO TurRehber.Rehber (Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili)
        OUTPUT INSERTED.RehberID
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const guideParams = [Ad, Soyad, Telefon, Email, Cinsiyet, DeneyimYili];

    try {
        sql.query(connectionString, insertGuideQuery, guideParams, (err: any, result: any) => {
            if (err) {
                console.error('Error during insert guide query:', err.message);
                res.status(500).send('Database error');
                return;
            }

            console.log('Insert guide query results:', result);

            const rehberID = result?.[0]?.RehberID;

            if (!rehberID) {
                console.error('Failed to retrieve inserted guide ID');
                res.status(500).send('Failed to create guide');
                return;
            }

            const insertLanguageQueries = Diller.map((dil: string) => ({
                query: `INSERT INTO TurRehber.Rehber_Dil (RehberID, Dil) VALUES (?, ?);`,
                params: [rehberID, dil]
            }));

            const executeLanguageQueries = async () => {
                for (const { query, params } of insertLanguageQueries) {
                    await new Promise<void>((resolve, reject) => {
                        sql.query(connectionString, query, params, (err: any) => {
                            if (err) {
                                console.error('Error during insert language query:', err.message);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
                }
            };

            executeLanguageQueries()
                .then(() => {
                    const newGuide = {
                        RehberID: rehberID,
                        Ad,
                        Soyad,
                        Telefon,
                        Email,
                        Cinsiyet,
                        DeneyimYili,
                        Diller,
                    };

                    console.log('New guide created:', newGuide);
                    res.status(201).json(newGuide);
                })
                .catch((error) => {
                    console.error('Error during language insertion:', error.message);
                    res.status(500).send('Failed to insert guide languages');
                });
        });
    } catch (error: any) {
        console.error('Error in createGuide:', error.message);
        res.status(500).send('An unexpected error occurred');
    }
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

    const deleteLanguagesQuery = `DELETE FROM TurRehber.Rehber_Dil WHERE RehberID = ?`;
    const deleteGuideQuery = `DELETE FROM TurRehber.Rehber WHERE RehberID = ?`;

    try {
        sql.query(connectionString, deleteLanguagesQuery, [guideId], (err: any, result: any) => {
            if (err) {
                console.error('Error during delete languages query:', err);
                res.status(500).send('Database error');
                return;
            }

            sql.query(connectionString, deleteGuideQuery, [guideId], (err: any, result: any) => {
                if (err) {
                    console.error('Error during delete guide query:', err);
                    res.status(500).send('Database error');
                    return;
                }

                res.send('Guide and associated languages successfully deleted');
            });
        });
    } catch (error: any) {
        console.error('Error in deleteGuide:', error.message);
        res.status(500).send('An unexpected error occurred');
    }
};
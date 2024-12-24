// import { Request, Response } from 'express';
// import sql from 'msnodesqlv8';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

// export const getAllGuideLanguages = (req: Request, res: Response) => {
//     const query = "SELECT * FROM TurRehber.Rehber_Dil";
//     sql.query(connectionString, query, (err: any, rows: any) => {
//         if (err) {
//             console.error('Error during database query:', err);
//             res.status(500).send('Database error');
//         } else {
//             res.json(rows);
//         }
//     });
// };

// export const getGuideLanguageById = (req: Request, res: Response) => {
//     const guideId = req.params.guideId;
//     const language = req.params.language;
//     const query = `SELECT * FROM TurRehber.Rehber_Dil WHERE RehberID = ${guideId} AND Dil = '${language}'`;
//     sql.query(connectionString, query, (err: any, rows: any) => {
//         if (err) {
//             console.error('Error during database query:', err);
//             res.status(500).send('Database error');
//         } else {
//             res.json(rows);
//         }
//     });
// };

// export const createGuideLanguage = (req: Request, res: Response) => {
//     const { RehberID, Dil } = req.body;
//     const query = `INSERT INTO TurRehber.Rehber_Dil (RehberID, Dil) VALUES (${RehberID}, '${Dil}')`;
//     sql.query(connectionString, query, (err: any, result: any) => {
//         if (err) {
//             console.error('Error during database query:', err);
//             res.status(500).send('Database error');
//         } else {
//             res.status(201).send('Guide language successfully added');
//         }
//     });
// };

// export const deleteGuideLanguage = (req: Request, res: Response) => {
//     const guideId = req.params.guideId;
//     const language = req.params.language;
//     const query = `DELETE FROM TurRehber.Rehber_Dil WHERE RehberID = ${guideId} AND Dil = '${language}'`;
//     sql.query(connectionString, query, (err: any, result: any) => {
//         if (err) {
//             console.error('Error during database query:', err);
//             res.status(500).send('Database error');
//         } else {
//             res.send('Guide language successfully deleted');
//         }
//     });
// };
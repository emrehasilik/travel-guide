import { Request, Response } from 'express';
import sql from 'msnodesqlv8';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

export const getAllCountries = (req: Request, res: Response) => {
    const query = "SELECT * FROM TurRehber.Ulke";
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};

export const getCountryById = (req: Request, res: Response) => {
    const countryId = req.params.id;
    const query = `SELECT * FROM TurRehber.Ulke WHERE UlkeID = ${countryId}`;
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.json(rows);
        }
    });
};
export const createCountry = async (req: Request, res: Response): Promise<void> => {
    console.log('CreateCountry endpoint called');
    const { UlkeAdi, UlkeKodu, Aciklama } = req.body;

    console.log('Request body:', { UlkeAdi, UlkeKodu, Aciklama });

    if (!UlkeAdi || !UlkeKodu || !Aciklama) {
        console.error('Validation failed: Missing fields');
        res.status(400).send('All fields are required');
        return;
    }

    try {
        const query = `
            INSERT INTO TurRehber.Ulke (UlkeAdi, UlkeKodu, Aciklama)
            OUTPUT INSERTED.UlkeID
            VALUES (?, ?, ?);
        `;
        const params = [UlkeAdi, UlkeKodu, Aciklama];

        console.log('Executing query:', query);
        console.log('Query parameters:', params);

        sql.query(connectionString, query, params, (err: any, results: any) => {
            if (err) {
                console.error('Database query error:', err.message);
                res.status(500).send('Database error');
                return;
            }

            console.log('veritabanı bağlantısı başarıyla gerçekleşti:', results);

            // Direkt olarak results[0] kontrol ediliyor
            const insertedId = results?.[0]?.UlkeID;

            if (!insertedId) {
                console.error('Failed to retrieve inserted ID');
                res.status(500).send('Failed to create country');
                return;
            }

            const newCountry = {
                UlkeID: insertedId,
                UlkeAdi,
                UlkeKodu,
                Aciklama,
            };

            console.log('New country created:', newCountry);
            res.status(201).json(newCountry);
        });
    } catch (error: any) {
        console.error('Error in createCountry:', error.message);
        res.status(500).send('An unexpected error occurred');
    }
};


export const updateCountry = (req: Request, res: Response) => {
    const countryId = req.params.id;
    const { UlkeAdi, UlkeKodu, Aciklama } = req.body;
    const query = `UPDATE TurRehber.Ulke SET UlkeAdi = '${UlkeAdi}', UlkeKodu = '${UlkeKodu}', Aciklama = '${Aciklama}' WHERE UlkeID = ${countryId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Country successfully updated');
        }
    });
};

export const deleteCountry = (req: Request, res: Response) => {
    const countryId = req.params.id;
    console.log(`Deleting country with ID: ${countryId}`); // Debugging line
    const query = `DELETE FROM TurRehber.Ulke WHERE UlkeID = ${countryId}`;
    sql.query(connectionString, query, (err: any, result: any) => {
        if (err) {
            console.error('Error during database query:', err);
            res.status(500).send('Database error');
        } else {
            console.log('Query Result:', result); // Debugging line
            res.send('Country successfully deleted');
        }
    });
};
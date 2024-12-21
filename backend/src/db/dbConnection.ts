import sql from 'msnodesqlv8';

const connectionString = `server=DESKTOP-NI2GVHU\\MSSQLSERVER_2022;Database=2024_MuratTasyurek_finalProject;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};`;

const query = "SELECT 1 AS Test";

export const connectToDatabase = () => {
    sql.query(connectionString, query, (err: any, rows: any) => {
        if (err) {
            console.error('Error during database query:', err);
        } else {
            console.log('Query Result:', rows);
        }
    });
};
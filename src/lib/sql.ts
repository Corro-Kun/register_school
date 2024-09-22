import {createPool} from 'mysql2/promise';

const sql = createPool({
    host: import.meta.env.DB_HOST,
    port: parseInt(import.meta.env.DB_PORT),
    user: import.meta.env.DB_USER,
    password: import.meta.env.DB_PASSWORD,
    database: import.meta.env.DB_DATABASE,
});

export default sql
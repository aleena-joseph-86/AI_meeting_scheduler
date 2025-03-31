import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRESQL_ADDON_USER,
  host: process.env.POSTGRESQL_ADDON_HOST,
  database: process.env.POSTGRESQL_ADDON_DB,
  password: process.env.POSTGRESQL_ADDON_PASSWORD,
  port: Number(process.env.POSTGRESQL_ADDON_PORT),
  ssl: { rejectUnauthorized: false },
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

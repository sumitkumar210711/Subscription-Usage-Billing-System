const mysql = require ("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function testConnection(): Promise<void> {
  try {
    const connection = await pool.getConnection();
    console.log("Your Nodejs Successfully Connected to MySQL!");
    connection.release();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("MySQL connection failed:", err.message);
    } else {
      console.error("MySQL connection failed:", err);
    }
  }
}




export = {pool, testConnection};

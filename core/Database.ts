import "dotenv/config";
import mysql, { type Pool } from "mysql2/promise";

class Database {
    static instance: Pool | null = null;

    static async getConnection(): Promise<Pool> {
        if (!this.instance) {
            this.instance = mysql.createPool({
                host: process.env.DB_HOST!,
                user: process.env.DB_USERNAME!,
                password: process.env.DB_PASSWORD!,
                database: process.env.DB_NAME!,
                supportBigNumbers: true,
                bigNumberStrings: true,

                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
        }

        return this.instance;
    }
}

export default Database;
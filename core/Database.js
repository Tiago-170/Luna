import "dotenv/config";
import mysql from "mysql2/promise";

class Database {
    static instance = null;

    static async getConnection() {
        if (!this.instance) {
            this.instance = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
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
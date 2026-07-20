import Database from "./Database.js";
import type { Pool } from "mysql2/promise";

class Model {

    static table = "";

    static async db(): Promise<Pool> {
        return Database.getConnection();
    }

    static async query(sql: string, params: unknown[] = []) {

        const db = await Database.getConnection();

        const [rows] = await db.execute<any>(sql as any, params as any);

        return rows;
    }
}

export default Model;
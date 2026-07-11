import Database from "./Database.js";

class Model {

    static table = "";

    static async db() {
        return Database.getConnection();
    }

    static async query(sql, params = []) {

        const db = await Database.getConnection();

        const [rows] = await db.execute(sql, params);

        return rows;
    }
}

export default Model;
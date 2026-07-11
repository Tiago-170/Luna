import Model from "../core/Model.js";

class Utilisateur extends Model {

    static table = "utilisateur";

    static async getById(id) {

        const db = await this.db();

        const [rows] = await db.execute(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );

        return rows[0] ?? null;
    }

    static async getAll() {

        const db = await this.db();

        const [rows] = await db.execute(
            `SELECT * FROM ${this.table}`
        );

        return rows;
    }

}

export default Utilisateur;
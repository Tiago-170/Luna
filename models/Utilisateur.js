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

    static async syncUser(id, username, icon_url) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO ${this.table} (utilisateur_id, pseudo, icon_url) VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE pseudo = VALUES(pseudo), icon_url = VALUES(icon_url)`,
            [id, username, icon_url]
        );
    }

}

export default Utilisateur;
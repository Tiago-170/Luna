import Model from "../core/Model.js";

class Utilisateur extends Model {

    static table = "utilisateur";

    static async getById(id: string | number) {

        const db = await this.db();

        const [rows] = await db.execute<any[]>(
            `SELECT * FROM ${this.table} WHERE utilisateur_id = ?`,
            [id]
        );

        return rows[0] ?? null;
    }

    static async getAll() {

        const db = await this.db();

        const [rows] = await db.execute<any[]>(
            `SELECT * FROM ${this.table}`
        );

        return rows;
    }

    static async addUser(id: string | number, username: string, icon_url: string) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO ${this.table} (utilisateur_id, pseudo, icon_url) VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE pseudo = VALUES(pseudo), icon_url = VALUES(icon_url)`,
            [id, username, icon_url]
        );
    }

}

export default Utilisateur;
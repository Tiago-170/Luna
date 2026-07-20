import Model from "../core/Model.js";

class Memoire extends Model {

    static table = "memoire";

    static async addMemoire(userId: string | number, messageMemoire: string) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO memoire (contenu, utilisateur_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE
            contenu = IF(VALUES(contenu) = 'NONE', contenu, VALUES(contenu));`,
            [messageMemoire, userId]
        );
    }

    static async getMemoireByUserId(userId: string | number) {
        const db = await this.db();

        const [result] = await db.execute<any[]>(
            `SELECT contenu FROM ${this.table}
            WHERE utilisateur_id = ?`,
            [userId]
        );

        return result;
    }
}

export default Memoire;
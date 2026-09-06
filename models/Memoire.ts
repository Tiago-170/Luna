import Model from "../core/Model.js";

class Memoire extends Model {

    static table = "memoire";

    /**
     *  Ajoute un nouveau message de mémoire pour un utilisateur spécifique dans la base de données
     *
     * @param {string | number} userId - L'ID de l'utilisateur.
     * @param {string} messageMemoire - Le message de mémoire.
     */
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

    /**
     *  Récupère tous les messages de mémoire associés à un utilisateur spécifique dans la base de données
     *
     * @param {string | number} userId - L'ID de l'utilisateur.
     * @returns {Object} Un tableau d'objets représentant les messages de mémoire associés à l'utilisateur.
     */
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
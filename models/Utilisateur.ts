import Model from "../core/Model.js";

class Utilisateur extends Model {

    static table = "utilisateur";

    /**
     *  Récupère un utilisateur par son ID.
     *
     * @param {string | number} id - L'ID de l'utilisateur.
     * @returns {Object} Un tableau d'objets représentant l'historique des messages associés à l'utilisateur.
     */
    static async getById(id: string | number) {

        const db = await this.db();

        const [rows] = await db.execute<any[]>(
            `SELECT * FROM ${this.table} WHERE utilisateur_id = ?`,
            [id]
        );

        return rows[0] ?? null;
    }

    /**
     *  Récupère tous les utilisateurs.
     *
     * @returns {Object} Un tableau d'objets représentant tous les utilisateurs.
     */
    static async getAll() {

        const db = await this.db();

        const [rows] = await db.execute<any[]>(
            `SELECT * FROM ${this.table}`
        );

        return rows;
    }

    /**
     *  Ajoute un nouvel utilisateur ou met à jour un utilisateur existant dans la base de données
     *
     * @param {string | number} id - L'ID de l'utilisateur.
     * @param {string | number} username - Le nom d'utilisateur.
     * @param {string | number} icon_url - L'URL de l'icône de l'utilisateur.
     */
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
import Model from "../core/Model.js";

class Serveur extends Model {

    static table = "serveur";

    /**
     *  Récupère un serveur par son ID.
     *
     * @param {string | number} id - L'ID du serveur.
     * @returns {Object} Un tableau d'objets représentant l'historique des messages associés au serveur.
     */
    static async getById(id: string | number) {

        const db = await this.db();

        const [rows] = await db.execute<any[]>(
            `SELECT * FROM ${this.table} WHERE serveur_id = ?`,
            [id]
        );

        return rows;
    }

    /**
     *  Ajoute un administrateur pour un serveur spécifique dans la base de données
     *
     * @param {string | number} id_serveur - L'ID du serveur.
     * @param {string | number} id_utilisateur - L'ID de l'utilisateur.
     * @returns {Object} message de confirmation, composant ou update d'un composant.
     */
    static async addAdmin(id_serveur: string | number, id_utilisateur: string | number) {
        const db = await this.db();

        const [result] = await db.execute(
            "INSERT INTO administrateur_serveur (serveur_id, utilisateur_id) VALUES (?, ?)",
            [id_serveur, id_utilisateur]
        );

        return result;
    }

    /**
     *  Ajoute un nouveau serveur ou met à jour un serveur existant dans la base de données
     *
     * @param {string | number} id - L'ID du serveur.
     * @param {string | number} nom - Le nom du serveur.
     * @param {string | number} icon - L'URL de l'icône du serveur.
     */
    static async createServer(id: string | number, nom: string, icon: string | null) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO ${this.table} (serveur_id, nom, icon_url) VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE nom = VALUES(nom), icon_url = VALUES(icon_url)`,
            [id, nom, icon]
        );
    }

    /**
     *  Supprime un serveur et toutes les données associées dans la base de données
     *
     * @param {string | number} id - L'ID du serveur.
     */
    static async deleteServer(id: string | number) {
        const db = await this.db();

        await db.execute(
            `DELETE serveur, admin, conv, message
             FROM ${this.table} serveur
             LEFT JOIN administrateur_serveur admin ON admin.serveur_id = serveur.serveur_id
             LEFT JOIN conversation conv ON conv.serveur_id = serveur.serveur_id
             LEFT JOIN message ON message.conversation_id = conv.conversation_id
             WHERE serveur.serveur_id = ?`,
            [id]
        );
    }

    /**
     *  Synchronise un administrateur pour un serveur spécifique dans la base de données
     *
     * @param {string | number} guildId - L'ID du serveur.
     * @param {string | number} adminId - L'ID de l'administrateur.
     */
    static async syncAdmin(guildId: string | number, adminId: string | number) {
        const db = await this.db();

        await db.execute(
            "INSERT IGNORE INTO administrateur_serveur (serveur_id, utilisateur_id) VALUES (?, ?)",
            [guildId, adminId]
        );
    }

}

export default Serveur;
import Model from "../core/Model.js";

class Serveur extends Model {

    static table = "serveur";

    static async getById(id) {

        const db = await this.db();

        const [rows] = await db.execute(
            `SELECT * FROM ${this.table} WHERE serveur_id = ?`,
            [id]
        );

        return rows;
    }

    static async addAdmin(id_serveur, id_utilisateur) {
        const db = await this.db();

        const [result] = await db.execute(
            "INSERT INTO administrateur_serveur (serveur_id, utilisateur_id) VALUES (?, ?)",
            [id_serveur, id_utilisateur]
        );

        return result;
    }

    static async createServer(id, nom, icon) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO ${this.table} (serveur_id, nom, icon_url) VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE nom = VALUES(nom), icon_url = VALUES(icon_url)`,
            [id, nom, icon]
        );
    }

    static async deleteServer(id) {
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

    static async syncAdmin(guildId, adminId) {
        const db = await this.db();

        await db.execute(
            "INSERT IGNORE INTO administrateur_serveur (serveur_id, utilisateur_id) VALUES (?, ?)",
            [guildId, adminId]
        );
    }

}

export default Serveur;
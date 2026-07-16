import Model from "../core/Model.js";

class Comptage extends Model {

    static table = "comptage";

    static async addComptageChannel(salonId, serveurId) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO ${this.table} (salon_id, serveur_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE salon_id = VALUES(salon_id)`,
            [salonId, serveurId]
        );
    }

    static async getAllByServerId(serveurId) {
        const db = await this.db();

        const [result] = await db.execute(
            `SELECT salon_id AS salonId,
             nombre AS nombre,
             serveur_id AS serveurId,
             utilisateur_id AS utilisateurId
             FROM ${this.table}
            WHERE serveur_id = ?`,
            [serveurId]
        );

        return result;
    }

    static async getByServerAndChannel(serveurId, salonId) {
        const db = await this.db();

        const [result] = await db.execute(
            `SELECT salon_id AS salonId,
             nombre AS nombre,
             serveur_id AS serveurId,
             utilisateur_id AS utilisateurId
             FROM ${this.table}
            WHERE serveur_id = ? AND salon_id = ?
            LIMIT 1`,
            [serveurId, salonId]
        );

        return result[0] ?? null;
    }

    static async updateCountAndUser(salonId, serveurId, nombre, utilisateurId) {
        const db = await this.db();

        await db.execute(
            `UPDATE ${this.table}
            SET nombre = ?, utilisateur_id = ?
            WHERE salon_id = ? AND serveur_id = ?`,
            [nombre, utilisateurId, salonId, serveurId]
        );
    }
}

export default Comptage;
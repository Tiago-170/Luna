import Model from "../core/Model.js";

class Comptage extends Model {

    static table = "comptage";

    static async addComptageChannel(salonId, serveurId, actif=true) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO ${this.table} (salon_id, serveur_id, actif)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE salon_id = VALUES(salon_id), actif = VALUES(actif)`,
            [salonId, serveurId, actif]
        );
    }

    static async getAllByServerId(serveurId) {
        const db = await this.db();

        const [result] = await db.execute(
            `SELECT salon_id AS salonId,
             nombre AS nombre,
             actif AS actif,
             serveur_id AS serveurId,
             utilisateur_id AS utilisateurId
             FROM ${this.table}
            WHERE serveur_id = ?`,
            [serveurId]
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

    static async updateActive(serveurId, actif) {
        const db = await this.db();

        await db.execute(
            `UPDATE ${this.table}
            SET actif = ?
            WHERE serveur_id = ?`,
            [actif, serveurId]
        );
    }

    static async Delete(guildId) {
        const db = await this.db();

        await db.execute(
            `DELETE FROM ${this.table}
            WHERE serveur_id = ?`,
            [guildId]
        );
    }
}

export default Comptage;
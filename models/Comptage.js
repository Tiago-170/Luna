import Model from "../core/Model.js";

class Comptage extends Model {

    static table = "comptage";

    static async addComptage(salonId, nombre, serveurId) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO ${this.table} (salon_id, nombre, serveur_id)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE salon_id = VALUES(salon_id), nombre = VALUES(nombre)`,
            [salonId, nombre, serveurId]
        );
    }

    static async getAllByServerId(serveurId) {
        const db = await this.db();

        const [result] = await db.execute(
            `SELECT * FROM ${this.table}
            WHERE serveur_id = ?`,
            [serveurId]
        );

        return result;
    }
}

export default Comptage;
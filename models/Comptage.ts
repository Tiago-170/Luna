import Model from "../core/Model.js";

class Comptage extends Model {

    static table = "comptage";

    /**
     *  Ajoute un nouveau salon de comptage ou met à jour un salon existant dans la base de données
     *
     * @param {string | number} salonId - L'ID du salon de comptage.
     * @param {string | number} serveurId - L'ID du serveur.
     * @param {boolean} actif - L'état actif du salon de comptage.
     * @returns {Object} message de confirmation, composant ou update d'un composant.
     */
    static async addComptageChannel(salonId: string | number, serveurId: string | number, actif = true) {
        const db = await this.db();

        await db.execute(
            `INSERT INTO ${this.table} (salon_id, serveur_id, actif)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE salon_id = VALUES(salon_id), actif = VALUES(actif)`,
            [salonId, serveurId, actif]
        );
    }

    /**
     *  Récupère tous les salons de comptage associés à un serveur spécifique dans la base de données
     *
     * @param {string | number} serveurId - L'ID du serveur.
     * @returns {Object} Un tableau d'objets représentant les salons de comptage associés au serveur.
     */
    static async getAllByServerId(serveurId: string | number) {
        const db = await this.db();

        const [result] = await db.execute<any[]>(
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

    /**
     *  Met à jour le nombre et l'utilisateur associé à un salon de comptage spécifique dans la base de données
     *
     * @param {string | number} salonId - L'ID du salon de comptage.
     * @param {string | number} serveurId - L'ID du serveur.
     * @param {number} nombre - Le nouveau nombre.
     * @param {string | number} utilisateurId - L'ID de l'utilisateur.
     * @returns {Object} message de confirmation, composant ou update d'un composant.
     */
    static async updateCountAndUser(salonId: string | number, serveurId: string | number, nombre: number, utilisateurId: string | number) {
        const db = await this.db();

        await db.execute(
            `UPDATE ${this.table}
            SET nombre = ?, utilisateur_id = ?
            WHERE salon_id = ? AND serveur_id = ?`,
            [nombre, utilisateurId, salonId, serveurId]
        );
    }

    /**
     *  Met à jour l'état actif d'un salon de comptage spécifique dans la base de données
     *
     * @param {string | number} serveurId - L'ID du serveur.
     * @param {number | boolean} actif - Le nouvel état actif.
     * @returns {Object} message de confirmation, composant ou update d'un composant.
     */
    static async updateActive(serveurId: string | number, actif: number | boolean) {
        const db = await this.db();

        await db.execute(
            `UPDATE ${this.table}
            SET actif = ?
            WHERE serveur_id = ?`,
            [actif, serveurId]
        );
    }

    /**
     *  Supprime un salon de comptage spécifique d'un serveur dans la base de données
     *
     * @param {string | number} guildId - L'ID du serveur.
     * @returns {Object} message de confirmation, composant ou update d'un composant.
     */
    static async Delete(guildId: string | number) {
        const db = await this.db();

        await db.execute(
            `DELETE FROM ${this.table}
            WHERE serveur_id = ?`,
            [guildId]
        );
    }
}

export default Comptage;
import Model from "../core/Model.js";

class Serveur extends Model {

    static table = "serveur";

    static async getById(id) {

        const db = await this.db();

        const [rows] = await db.execute(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );

        return rows;
    }

}

export default Serveur;
import Model from "../core/Model.js";

class Message extends Model {

    static table = "message";

    static async getById(id) {

        const db = await this.db();

        const [rows] = await db.execute(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );

        return rows;
    }

    static async addMessage(id_message, id_user, id_guild, message, is_bot=false) {

        const db = await this.db();

        const [rows] = await db.execute(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );

        return rows;
    }

}

export default Message;
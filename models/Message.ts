import Model from "../core/Model.js";

class Message extends Model {

    static table = "message";

    static async addMessageDM(messageIdAuthor: string | number, messageAuthorId: string | number, messageContent: string, iaResponse: string, messageIdIa: string | number) {
        const db = await this.db();

        let [rows] = await db.execute<any[]>(
            `SELECT conversation_id
            FROM conversation
            WHERE utilisateur_id = ? AND serveur_id IS NULL`,
            [messageAuthorId]
        );

        let conversationId;

        if (rows.length === 0) {
            const [result] = await db.execute<any>(
                `INSERT INTO conversation (utilisateur_id)
                VALUES (?)`,
                [messageAuthorId]
            );

            conversationId = result.insertId;
        } else {
            conversationId = rows[0].conversation_id;
        }

        await db.execute(
            `INSERT INTO message
            (id_message, contenu, bot, utilisateur_id, conversation_id)
            VALUES (?, ?, ?, ?, ?)`,
            [messageIdAuthor, messageContent, 0, messageAuthorId, conversationId]
        );

        await db.execute(
            `INSERT INTO message
            (id_message, contenu, bot, utilisateur_id, conversation_id)
            VALUES (?, ?, ?, ?, ?)`,
            [messageIdIa, iaResponse, 1, null, conversationId]
        );

        await db.execute(
            `DELETE FROM message
            WHERE conversation_id = ?
            AND id_message NOT IN (
                SELECT id_message FROM (
                    SELECT id_message
                    FROM message
                    WHERE conversation_id = ?
                    ORDER BY date_message DESC
                    LIMIT 40
                ) AS derniers
            )`,
            [conversationId, conversationId]
        );
    }

    static async addMessageGuild(messageIdAuthor: string | number, messageGuildId: string | number, messageAuthorId: string | number, messageContent: string, iaResponse: string, messageIdIa: string | number) {
        const db = await this.db();

        let [rows] = await db.execute<any[]>(
            `SELECT conversation_id
            FROM conversation
            WHERE serveur_id = ?`,
            [messageGuildId]
        );

        let conversationId;

        if (rows.length === 0) {
            const [result] = await db.execute<any>(
                `INSERT INTO conversation (serveur_id)
                VALUES (?)`,
                [messageGuildId]
            );

            conversationId = result.insertId;
        } else {
            conversationId = rows[0].conversation_id;
        }

        await db.execute(
            `INSERT INTO message
            (id_message, contenu, bot, utilisateur_id, conversation_id)
            VALUES (?, ?, ?, ?, ?)`,
            [messageIdAuthor, messageContent, 0, messageAuthorId, conversationId]
        );

        await db.execute(
            `INSERT INTO message
            (id_message, contenu, bot, utilisateur_id, conversation_id)
            VALUES (?, ?, ?, ?, ?)`,
            [messageIdIa, iaResponse, 1, null, conversationId]
        );

        await db.execute(
            `DELETE FROM message
            WHERE conversation_id = ?
            AND id_message NOT IN (
                SELECT id_message FROM (
                    SELECT id_message
                    FROM message
                    WHERE conversation_id = ?
                    ORDER BY date_message DESC
                    LIMIT 40
                ) AS derniers
            )`,
            [conversationId, conversationId]
        );
    }

    static async getHistoricByUserId(messageAuthorId: string | number) {
        const db = await this.db();

        const [rows] = await db.execute<any[]>(
            `SELECT conversation_id
            FROM conversation
            WHERE utilisateur_id = ?`,
            [messageAuthorId]
        );

        if (rows.length === 0) {
            return null;
        }
        const conversationId = rows[0].conversation_id;

        const [result] = await db.execute<any[]>(
            `SELECT 
                message.contenu AS message,
                message.bot,
                message.date_message AS date,
                utilisateur.pseudo AS userName
            FROM message
            LEFT JOIN utilisateur 
                ON message.utilisateur_id = utilisateur.utilisateur_id
            WHERE conversation_id = ?
            ORDER BY date_message ASC
            LIMIT 40;`,
            [conversationId]
        );

        return result;
    }


    static async getHistoricByGuildId(messageGuildId: string | number) {
        const db = await this.db();

        const [rows] = await db.execute<any[]>(
            `SELECT conversation_id
            FROM conversation
            WHERE serveur_id = ?`,
            [messageGuildId]
        );

        if (rows.length === 0) {
            return null;
        }
        const conversationId = rows[0].conversation_id;

        const [result] = await db.execute<any[]>(
            `SELECT 
                message.contenu AS message,
                message.bot,
                message.date_message AS date,
                utilisateur.pseudo AS userName
            FROM message
            LEFT JOIN utilisateur 
                ON message.utilisateur_id = utilisateur.utilisateur_id
            WHERE conversation_id = ?
            ORDER BY date_message ASC
            LIMIT 40;`,
            [conversationId]
        );

        return result;
    }

}

export default Message;
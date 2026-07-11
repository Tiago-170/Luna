import client from "../core/Client.js";
import GuildDeleteController from "../controllers/GuildDeleteController.js";

client.on('guildDelete', async (guild) => {
    await new GuildDeleteController().execute(guild);
});
import client from "../core/Client.js";
import GuildDeleteController from "../controllers/GuildDeleteController.js";

// Gère l'événement de suppression d'un serveur Discord.
client.on('guildDelete', async (guild) => {
    await new GuildDeleteController().execute(guild);
});
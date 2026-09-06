import client from "../core/Client.js";
import GuildCreateController from "../controllers/GuildCreateController.js";

// Gère l'événement de création d'un serveur Discord.
client.on("guildCreate", async (guild) => {
    await new GuildCreateController().execute(guild);
});
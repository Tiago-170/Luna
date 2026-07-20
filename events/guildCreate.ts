import client from "../core/Client.js";
import GuildCreateController from "../controllers/GuildCreateController.js";

client.on("guildCreate", async (guild) => {
    await new GuildCreateController().execute(guild);
});
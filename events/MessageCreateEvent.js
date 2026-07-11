import client from "../core/Client.js";
import ChatController from "../controllers/ChatController.js";

client.on("messageCreate", async (message) => {

    if (message.author.bot)
        return;

    await new ChatController().execute(message);

});
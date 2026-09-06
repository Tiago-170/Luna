import client from "../core/Client.js";
import ChatController from "../controllers/ChatController.js";
import CounterController from "../controllers/CounterController.js";

// Gère l'événement de création d'un message dans un serveur Discord.
client.on("messageCreate", async (message) => {

    if (message.author.bot)
        return;

    await new ChatController().execute(message);
    await new CounterController().execute(message);

});
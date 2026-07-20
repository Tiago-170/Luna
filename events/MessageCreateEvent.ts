import client from "../core/Client.js";
import ChatController from "../controllers/ChatController.js";
import CounterController from "../controllers/CounterController.js";

client.on("messageCreate", async (message) => {

    if (message.author.bot)
        return;

    await new ChatController().execute(message);
    await new CounterController().execute(message);

});
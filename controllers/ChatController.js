import Controller from "../core/Controller.js";
import 'dotenv/config';
import IaService from "../services/IaService.js";

class ChatController extends Controller {

    async execute(message) {
        if (message.mentions.has(message.client.user) || message.content.toLowerCase().includes("luna") || message.channel.name.toLowerCase().includes("luna")) {
            const IA = new IaService();

            const author = message.author.username;
            const messageContent = message.content;

            const iaResponse = await IA.generate_response(messageContent, author);
            
            return message.reply(iaResponse);
        }
    }

}

export default ChatController;
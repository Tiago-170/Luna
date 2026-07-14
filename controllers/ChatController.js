import Controller from "../core/Controller.js";
import 'dotenv/config';
import IaService from "../services/IaService.js";
import Message from "../models/Message.js";
import { ChannelType } from 'discord.js';

const cooldowns = new Map();
const cooldownsTime = 5000;

class ChatController extends Controller {

    async execute(message) {
        if (message.mentions.has(message.client.user) || message.content.toLowerCase().includes("luna") || message.channel.name.toLowerCase().includes("luna") || message.channel.type === ChannelType.DM) {
            if (message.content.length > 1000) {
                return;
            }
            const userId = message.author.id;

            const lastMessage = cooldowns.get(userId);

            if (lastMessage && Date.now() - lastMessage < cooldownsTime) {
                return;
            }

            cooldowns.set(userId, Date.now());
            
            const IA = new IaService();

            const author = message.author.username;
            const messageContent = message.content;
            
            let historiques

            if (message.channel.type === ChannelType.DM) {
                historiques = await Message.getHistoricByUserId(message.author.id);
            } else {
                historiques = await Message.getHistoricByGuildId(message.guild.id);
            }
            

            const iaResponse = await IA.generateResponse(messageContent, author, historiques);

            const botMessage = await message.reply(iaResponse);

            if (message.channel.type === ChannelType.DM) {
                await Message.addMessageDM(message.id, message.author.id, message.content, iaResponse, botMessage.id);
            } else {
                await Message.addMessageGuild(message.id, message.guild.id, message.author.id, message.content, iaResponse, botMessage.id);
            }
            
            return;
        }
    }

}

export default ChatController;
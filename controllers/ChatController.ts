import Controller from "../core/Controller.js";
import 'dotenv/config';
import IaService from "../services/IaService.js";
import Message from "../models/Message.js";
import Memoire from "../models/Memoire.js";
import { ChannelType } from 'discord.js';
import Utilisateur from "../models/Utilisateur.js";
import type { Message as DiscordMessage } from "discord.js";

const cooldowns = new Map();
const cooldownsTime = 5000;

class ChatController extends Controller {

    async execute(message: DiscordMessage) {
        const channelName = "name" in message.channel ? message.channel.name?.toLowerCase() ?? "" : "";

        if (message.mentions.has(message.client.user) || message.content.toLowerCase().includes("luna") || channelName.includes("luna") || message.channel.type === ChannelType.DM) {
            if (message.content.length > 1000) {
                return;
            }
            const userId = message.author.id;

            await Utilisateur.addUser(message.author.id, message.author.username, message.author.displayAvatarURL());

            const lastMessage = cooldowns.get(userId);

            if (lastMessage && Date.now() - lastMessage < cooldownsTime) {
                return;
            }

            cooldowns.set(userId, Date.now());
            
            const IA = new IaService();

            const author = message.author.username;
            const messageContent = message.content;
            
            let historiques;

            const guildId = message.guild?.id;

            if (message.channel.type === ChannelType.DM) {
                historiques = await Message.getHistoricByUserId(message.author.id);
            } else {
                if (!guildId) {
                    return;
                }

                historiques = await Message.getHistoricByGuildId(guildId);
            }

            const memoire = await Memoire.getMemoireByUserId(message.author.id);

            const data = await IA.generateResponse(messageContent, author, historiques, memoire);
            const iaResponse = data.reponse;

            const botMessage = await message.reply(iaResponse);

            if (message.channel.type === ChannelType.DM) {
                await Message.addMessageDM(message.id, message.author.id, message.content, iaResponse, botMessage.id);
            } else {
                if (!guildId) {
                    return;
                }

                await Message.addMessageGuild(message.id, guildId, message.author.id, message.content, iaResponse, botMessage.id);
            }
            await Memoire.addMemoire(message.author.id, data["memoire"] ?? "NONE");

            return;
        }
    }

}

export default ChatController;
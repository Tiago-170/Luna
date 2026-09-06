import Controller from "../core/Controller.js";
import 'dotenv/config';
import IaService from "../services/IaService.js";
import Message from "../models/Message.js";
import Memoire from "../models/Memoire.js";
import { ChannelType } from 'discord.js';
import Utilisateur from "../models/Utilisateur.js";
import type { Message as DiscordMessage } from "discord.js";

// Cooldown pour éviter le spam.
const cooldowns = new Map();
const cooldownsTime = 5000; // 5 secondes de cooldown.

class ChatController extends Controller {

    /**
     * Gère les messages envoyés dans les salons Discord et les messages privés.
     * Gère les interactions avec l'IA et enregistre les messages dans la base de données.
     *
     * @param {any} message - objet représentant le message discord et toutes les informations associées.
     */
    async execute(message: DiscordMessage) {
        const channelName = "name" in message.channel ? message.channel.name?.toLowerCase() ?? "" : "";

        // Vérifie si le message mentionne le bot ou son nom, ou si le message est un message privé.
        if (message.mentions.has(message.client.user) || message.content.toLowerCase().includes("luna") || channelName.includes("luna") || message.channel.type === ChannelType.DM) {
            // Vérifie si le message est trop long pour éviter les abus.
            if (message.content.length > 1000) {
                return;
            }
            const userId = message.author.id;

            await Utilisateur.addUser(message.author.id, message.author.username, message.author.displayAvatarURL());

            const lastMessage = cooldowns.get(userId);
            
            // Vérifie si l'utilisateur est en cooldown pour éviter le spam.
            if (lastMessage && Date.now() - lastMessage < cooldownsTime) {
                return;
            }

            // Met à jour le cooldown pour l'utilisateur.
            cooldowns.set(userId, Date.now());
            
            const IA = new IaService();

            const author = message.author.username;
            const messageContent = message.content;
            
            let historiques;

            const guildId = message.guild?.id;
            
            // Récupère l'historique des messages en fonction du type de canal (DM ou serveur).
            if (message.channel.type === ChannelType.DM) {
                historiques = await Message.getHistoricByUserId(message.author.id);
            } else {
                if (!guildId) {
                    return;
                }

                historiques = await Message.getHistoricByGuildId(guildId);
            }

            const memoire = await Memoire.getMemoireByUserId(message.author.id);

            // Génère la réponse de l'IA en utilisant le service IaService.
            const data = await IA.generateResponse(messageContent, author, historiques, memoire);
            let iaResponse = data.reponse;

            // Si l'IA renvoie une réponse vide, utiliser un fallback pour éviter les erreurs
            if (!iaResponse || (typeof iaResponse === 'string' && iaResponse.trim() === '')) {
                console.warn(`IA a renvoyé une réponse vide pour le message ${message.id} de ${message.author.id}`);
                iaResponse = "Désolé, je n'ai pas de réponse pour le moment.";
            }

            let botMessage: any;
            try {
                botMessage = await message.reply(iaResponse);
            } catch (err) {
                console.error('Erreur lors de l\'envoi du message de bot :', err);
                // Ne pas relancer l'erreur pour éviter que le process se termine.
            }

            // Enregistre l'historique et la mémoire des messages en fonction du type de canal (DM ou serveur).
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
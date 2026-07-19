import Controller from "../core/Controller.js";
import Comptage from "../models/Comptage.js";
import client from "../core/Client.js";

import { MessageFlags } from "discord.js";

class CounterController extends Controller {
    static async createCounterComponents(serverId) {
        const comptageInfo = await Comptage.getAllByServerId(serverId);
        let channelId;
        let active;
        let channelNameMessage;

        if (comptageInfo) {
            channelId = comptageInfo.salonId;
            active = comptageInfo.actif;
        }

        if(channelId) {
            channelNameMessage = `le salon  <#${channelId}>`;
        } else {
            channelNameMessage = "aucun salon";
        }

        const separator = { type: 14, divider: true, spacing: 2 };
        const header = { type: 10, content: "# Configuration du Comptage\n\nBienvenue dans le panneau de configuration du jeu de comptage !" };
        const desc = { type: 10, content: `Le jeu est actuellement ${active === 1 ? "activé" : "désactivé"} dans ${channelNameMessage}.\n\nUtilisez les boutons ci-dessous pour configurer le jeu sur votre serveur.` };
        const btnRow = { type: 1,
            components: [
                { type: 2, style: 1, label: "Publier le jeu", emoji: {id: "1528498321889558549"}, custom_id: "c_setup" },
                { type: 2, style: 4, label: "Réinitialiser", emoji: {id: "1528497532424945834"}, custom_id: "c_reset" },
            ]
        };
        const helpText = { type: 10, content: "Si vous avez besoin d'explications sur les boutons, utilisez le menu ci-dessous" };
        const helpRow = { type: 1,
            components: [{
                type: 3, custom_id: "counter_help_select", placeholder: "Explication des boutons",
                options: [
                    { label: "Publier le jeu", value: "expl_setup", description: "Explication sur la publication du jeu", emoji: {name: "ℹ️"} }
                ]
            }]
        };

        if (active === 1) {
            btnRow.components.push({ type: 2, style: 4, label: "Désactiver le jeu", custom_id: "c_disable" });
        } else if (active === 0) {
            btnRow.components.push({ type: 2, style: 3, label: "Activer le jeu", custom_id: "c_enable" });
        }

        return {
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
            components: [ { type: 17, accent_color: 0x4b5ba9, components: [ header, separator, desc, btnRow, separator, helpText, helpRow] } ]
        };
    }

    static async handlers(interaction) {
        if (interaction.customId === "counter_help_select") {
            const selected = interaction.values[0];

            switch (selected) {
                case "expl_setup":
                    const separator = { type: 14, divider: true, spacing: 2 };
                    const header = { type: 10, content: "# Explication sur la publication du jeu" };
                    const desc = { type: 10, content: "Ce bouton permet de choisir un salon dans lequel le jeu de comptage sera appliqué." };
                    const expilcationImage = { type: 12, items: [ { media: { url: "https://tiago.cadenassecode.fr/Luna/.bot/app/.document/expilcationImageCounterPublication.png"}, description: "explication sur le bouton de publication du jeu" } ]};
                    return { flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
                        components: [{
                            type: 17, 
                            accent_color: 0x4b5ba9, 
                            components: [ header ,separator ,desc, expilcationImage]
                        }]
                    };
            }  
        } else if (interaction.customId === "c_channel_select") {
            const selectedChannel = interaction.values[0];
            await Comptage.addComptageChannel(selectedChannel, interaction.guild.id);

            return { content: `Le jeu de comptage est appliqué dans le salon <#${selectedChannel}>.`, flags: MessageFlags.Ephemeral };

        } else {
            const action = interaction.customId;

            switch (action) {
                case "c_setup":
                    const separator = { type: 14, divider: true, spacing: 2 };
                    const header = { type: 10, content: "# Publication du jeu" };
                    const channelRow = { 
                        type: 1, components: 
                            [ { type: 8, custom_id: "c_channel_select", channel_types: [0], placeholder: "Quel salon ?" }]
                    };
            
                    return { flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
                        components: [{
                            type: 17, 
                            accent_color: 0x4b5ba9, 
                            components: [ header ,separator ,channelRow ]
                        }]
                    };
                case "c_reset":
                    await Comptage.Delete(interaction.guild.id);
                    return { content: "Le jeu de comptage a été réinitialisé.", flags: MessageFlags.Ephemeral };
                case "c_enable":
                    await Comptage.updateActive(interaction.guild.id, 1);

                    return {
                        update: true,
                        data: await CounterController.createCounterComponents(interaction.guild.id)
                    };

                case "c_disable":
                    await Comptage.updateActive(interaction.guild.id, 0);

                    return {
                        update: true,
                        data: await CounterController.createCounterComponents(interaction.guild.id)
                    };
            }
        }
    }
    async execute(message) {

        const comptage = await Comptage.getAllByServerId(message.guild.id);

        if (!comptage) {
            return;
        }

        if (message.channel.id !== comptage.salonId) {
            return;
        }
        
        if (comptage.actif === 0) {
            return;
        }

        const number = Number(comptage.nombre);
        const expected = String(number + 1);
        const content = message.content.trim();

        if (String(comptage.utilisateurId) === String(message.author.id)) {
            const errorMessage = await message.reply(`❌ Vous ne pouvez pas compter deux fois de suite.`);

            setTimeout(() => {
                errorMessage.delete().catch(() => {});
            }, 4000);

            if (message.deletable) {
                try {
                    await message.delete();
                } catch (error) {
                    console.error(error);
                }
            }
            return;
        }

        if (content !== expected) {
            const errorMessage = await message.reply(`❌ Nombre incorrect, le nombre suivant est ${expected}.`);

            setTimeout(() => {
                errorMessage.delete().catch(() => {});
            }, 4000);

            if (message.deletable) {
                try {
                    await message.delete();
                } catch (error) {
                    console.error(error);
                }
            }
            return;
        }

        await Comptage.updateCountAndUser(message.channel.id, message.guild.id, number + 1, message.author.id);
    }
}

export default CounterController;
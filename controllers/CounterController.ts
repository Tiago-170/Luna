import Controller from "../core/Controller.js";
import Comptage from "../models/Comptage.js";

import { MessageFlags } from "discord.js";

class CounterController extends Controller {

    // Un séparateur pour les composants discord
    static separator = { type: 14, divider: true, spacing: 2 };
    
    /**
     * Crée un en-tête pour les composants discord.
     *
     * @param {string} content - Le contenu de l'en-tête.
     * @returns {Object} L'objet représentant l'en-tête.
     */
    static createHeader(content: string) { return { type: 10, content: content } };

    /**
     * Crée un composants du jeu de comptage.
     *
     * @param {string | number} serverId - L'ID du serveur discord.
     * @returns {Object} L'objet représentant les composants du jeu de comptage.
     */
    static async createCounterComponents(serverId: string | number) {
        // Récupère les informations du jeu de comptage pour le serveur.
        const comptageInfo = await Comptage.getAllByServerId(serverId);

        // Déclare les variables pour plus tard.
        let channelId; // ID du salon de comptage.
        let active; // État du jeu de comptage (activé ou désactivé).
        let channelNameMessage; // Nom du salon de comptage actuel.

        if (comptageInfo) {
            channelId = comptageInfo.salonId;
            active = comptageInfo.actif;
        }

        if(channelId) {
            channelNameMessage = `le salon  <#${channelId}>`;
        } else {
            channelNameMessage = "aucun salon";
        }

        // Crée les composants discord pour le jeu de comptage.
        const header = this.createHeader("# Configuration du Comptage\n\nBienvenue dans le panneau de configuration du jeu de comptage !");
        const desc = { type: 10, content: `Le jeu est actuellement ${active === 1 ? "activé" : "désactivé"} dans ${channelNameMessage}.\n\nUtilisez les boutons ci-dessous pour configurer le jeu sur votre serveur.` };
        const btnRow: any = { type: 1, components: [ { type: 2, style: 1, label: "Publier le jeu", emoji: {id: "1528498321889558549"}, custom_id: "c_setup" } ] };
        const helpText = { type: 10, content: "Si vous avez besoin d'explications sur les boutons, utilisez le menu ci-dessous" };
        const helpRow: any = { type: 1,
            components: [{
                type: 3, custom_id: "counter_help_select", placeholder: "Explication des boutons",
                options: [
                    { label: "Publier le jeu", value: "expl_setup", description: "Explication sur la publication du jeu", emoji: {name: "ℹ️"} },
                    { label: "Réinitialiser", value: "expl_reset", description: "Explication sur la réinitialisation du jeu", emoji: {name: "ℹ️"} },
                    { label: "Activer/Désactiver le jeu", value: "expl_enable_disable", description: "Explication sur l'activation/désactivation du jeu", emoji: {name: "ℹ️"} }
                ]
            }]
        };
        
        // Gestion de l'affichage des boutons en fonction de l'état du jeu de comptage.
        if (comptageInfo) {
            btnRow.components.push({ type: 2, style: 4, label: "Réinitialiser", emoji: {id: "1528497532424945834"}, custom_id: "c_reset" });
        }

        if (active === 1) {
            btnRow.components.push({ type: 2, style: 4, label: "Désactiver le jeu", custom_id: "c_disable" });
        } else if (active === 0) {
            btnRow.components.push({ type: 2, style: 3, label: "Activer le jeu", custom_id: "c_enable" });
        }

        return {
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
            components: [ { type: 17, accent_color: 0x4b5ba9, components: [ header, this.separator, desc, btnRow, this.separator, helpText, helpRow] } ]
        };
    }

    /**
     * Crée un composants du jeu de comptage et gère les interactions.
     *
     * @param {any} interaction - L'interaction discord (boutons, selection, etc..).
     * @returns {Object} message de confirmation, composant ou update d'un composant.
     */
    static async handlers(interaction: any) {

        // Gestion des interactions de selection avec les composants discord.
        if (interaction.customId === "counter_help_select") {
            const selected = interaction.values[0];

            switch (selected) {
                case "expl_setup":
                    const header = this.createHeader("# Explication sur la publication du jeu");
                    const desc = { type: 10, content: "Ce bouton permet de choisir un salon dans lequel le jeu de comptage sera appliqué." };
                    const expilcationImage = { type: 12, items: [ { media: { url: "https://tiago.cadenassecode.fr/Luna/.bot/app/.document/expilcationImageCounterPublication.png"}, description: "explication sur le bouton de publication du jeu" } ]};
                    return { flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
                        components: [{ type: 17, accent_color: 0x4b5ba9, components: [ header ,this.separator ,desc, expilcationImage] }]
                    };
                case "expl_reset":
                    const headerReset = this.createHeader("# Explication sur la réinitialisation du jeu");
                    const descReset = { type: 10, content: "Ce bouton permet de réinitialiser le jeu de comptage. Toutes les données seront effacées." };
                    return { flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
                        components: [{ type: 17, accent_color: 0x4b5ba9,  components: [ headerReset ,this.separator ,descReset] }]
                    };
                case "expl_enable_disable":
                    const headerEnableDisable = this.createHeader("# Explication sur l'activation/désactivation du jeu");
                    const descEnableDisable = { type: 10, content: "Ce bouton permet d'activer ou de désactiver le jeu de comptage." };
                    return { flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
                        components: [{ type: 17, accent_color: 0x4b5ba9, components: [ headerEnableDisable ,this.separator ,descEnableDisable] }]
                    };
            }  
         
        } else if (interaction.customId === "c_channel_select") {
            // Gestion des interactions de selection de salons avec les composants discord.
            const selectedChannel = interaction.values[0];
            await Comptage.addComptageChannel(selectedChannel, interaction.guild.id);

            return { content: `Le jeu de comptage est appliqué dans le salon <#${selectedChannel}>.`, flags: MessageFlags.Ephemeral };
        
        } else {
            // Gestion des interactions de boutons avec les composants discord.
            const action = interaction.customId;

            switch (action) {
                case "c_setup":
                    const header = this.createHeader("# Publication du jeu");
                    const channelRow = { 
                        type: 1, components: 
                            [ { type: 8, custom_id: "c_channel_select", channel_types: [0], placeholder: "Quel salon ?" }]
                    };
            
                    return { flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
                        components: [{ type: 17, accent_color: 0x4b5ba9, components: [ header ,this.separator ,channelRow ] }]
                    };
                case "c_reset":
                    await Comptage.Delete(interaction.guild.id);
                    return {
                        update: true,
                        data: await CounterController.createCounterComponents(interaction.guild.id)
                    };

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

    /**
     *  Gère les interactions.
     *
     * @param {any} message - objet représentant le message discord et toutes les informations associées.
     */
    async execute(message: any) {

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
import Controller from "../core/Controller.js";
import Comptage from "../models/Comptage.js";

import { MessageFlags } from "discord.js";

class CounterController extends Controller {

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
                    break;
            }
        }
    }
    async execute(message) {

        const comptage = await Comptage.getByServerAndChannel(message.guild.id, message.channel.id);

        if (!comptage) {
            return;
        }
        const number = Number(comptage.nombre);
        const expected = String(number + 1);
        const content = message.content.trim();

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

        await Comptage.updateCountAndUser(message.channel.id, message.guild.id, number + 1, message.author.id);
    }
}

export default CounterController;
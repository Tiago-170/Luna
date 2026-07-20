import client from "../core/Client.js";
import Router from "../core/Router.js";

import CounterController from "../controllers/CounterController.js";

import { PermissionFlagsBits } from "discord.js";

client.on('interactionCreate', async (interaction) => {

    if (interaction.isChatInputCommand()) {
        try {
            const command = interaction.commandName;

            if (command === 'counter') {
                if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
                    return interaction.reply({
                        content: "❌ Tu dois être administrateur pour utiliser cette commande.",
                        flags: 64
                    });
                }
                const components = await CounterController.createCounterComponents(interaction.guild.id);
                await interaction.reply(components);
            }

        } catch (error) {
            console.error(`Erreur commande ${interaction.commandName}:`, error);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: "❌ Une erreur interne est survenue.", ephemeral: true });
            }
        }
    }

    const action = interaction.customId;

    if (
        (interaction.isButton() && ["c_setup", "c_reset", "c_disable", "c_enable"].includes(action)) || 
        (interaction.isStringSelectMenu() && action === "counter_help_select") ||
        (interaction.isChannelSelectMenu() && action === "c_channel_select")
    ) {
        const components = await CounterController.handlers(interaction);

        if (components.update) {
            await interaction.update(components.data);
        } else {
            await interaction.reply(components);
        }

        return;
    }

    await Router.dispatch(interaction);
});
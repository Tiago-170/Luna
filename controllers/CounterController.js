import Controller from "../core/Controller.js";
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
            
                    return { flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
                        components: [{
                            type: 17, 
                            accent_color: 0x4b5ba9, 
                            components: [ header ,separator ,desc]
                        }]
                    };
                case "expl_redir":
                    // Explication Redirect

                case "expl_msg":
                    // Explication Message
            }  
        } else if (interaction.customId === "c_channel_select") {
            const selectedChannel = interaction.values[0];
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

                case "c_redirect":
                    // Redirect
                    break;

                case "c_msg":
                    // Message
                    break;
            }
        }
    }
}

export default CounterController;
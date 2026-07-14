import { MessageFlags } from "discord.js";

class CounterCommand {

    static createCounterComponents() {
        const separator = { type: 14, divider: true, spacing: 2 };

        const header = { type: 10, content: "# Configuration du Comptage\n\nBienvenue dans le panneau de configuration du jeu de comptage !" };
        const desc = { type: 10, content: "Utilisez les boutons ci-dessous pour configurer le jeu sur votre serveur" };

        const btnRow = {
            type: 1,
            components: [
                { type: 2, style: 3, label: "Publier le jeu", emoji: {name: "📤"}, custom_id: "c_setup" },
                { type: 2, style: 1, label: "Redirection", emoji: {name: "📢"}, custom_id: "c_redirect" },
                { type: 2, style: 2, label: "Message d'erreur", emoji: {name: "📝"}, custom_id: "c_msg" }
            ]
        };

        const helpText = { type: 10, content: "Si vous avez besoin d'explications sur les boutons, utilisez le menu ci-dessous" };
        const helpRow = {
            type: 1,
            components: [{
                type: 3, custom_id: "counter_help_select", placeholder: "Explication des boutons",
                options: [
                    { label: "Publier le jeu", value: "expl_setup", description: "Explication sur la publication du jeu", emoji: {name: "ℹ️"} },
                    { label: "Redirection", value: "expl_redir", description: "Explication sur la redirection", emoji: {name: "ℹ️"} },
                    { label: "Message d'erreur", value: "expl_msg", description: "Explication sur le message d'erreur", emoji: {name: "ℹ️"} }
                ]
            }]
        };

        return {
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
            components: [
                {
                    type: 17,
                    accent_color: 0x4b5ba9,
                    components: [
                        header,
                        separator,
                        desc,
                        btnRow,
                        separator,
                        helpText,
                        helpRow
                    ]
                }
            ]
        };
    }

}

export default CounterCommand;
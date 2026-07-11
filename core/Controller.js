class Controller {

    /**
     * Répond à l'interaction
     */
    async reply(interaction, data) {
        return interaction.reply(data);
    }

    /**
     * Envoie un message supplémentaire après la réponse initiale.
     */
    async followUp(interaction, message, ephemeral = false) {
        return interaction.followUp({
            content: message,
            ephemeral: ephemeral
        });
    }

    /**
     * Réponse privée (ephemeral)
     */
    async ephemeral(interaction, message) {
        return interaction.reply({
            content: message,
            ephemeral: true
        });
    }

    /**
     * Modifier la réponse
     */
    async edit(interaction, data) {
        return interaction.editReply(data);
    }

    /**
     * Réponse différée
     */
    async defer(interaction, ephemeral = false) {
        return interaction.deferReply({ ephemeral });
    }

    /**
     * Gestion commune des erreurs
     */
    async handleError(interaction, error) {
        console.error(error);

        const response = {
            content: "Une erreur est survenue.",
            ephemeral: true
        };

        if (interaction.deferred || interaction.replied) {
            return interaction.editReply(response);
        }

        return interaction.reply(response);
    }

}

export default Controller;
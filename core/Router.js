class Router {

    static routes = new Map();

    static register(name, controller) {
        this.routes.set(name, controller);
    }

    static async dispatch(interaction) {

        const Controller = this.routes.get(interaction.commandName);

        if (!Controller) {
            if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: "Commande inconnue ou non enregistrée.",
                    ephemeral: true
                });
            }
            return;
        }

        const controller = new Controller();

        await controller.execute(interaction);

    }

}

export default Router;
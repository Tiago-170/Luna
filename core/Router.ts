class Router {

    static routes = new Map<string, any>();

    static register(name: string, controller: any) {
        this.routes.set(name, controller);
    }

    static async dispatch(interaction: any) {

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
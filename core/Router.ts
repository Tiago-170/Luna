class Router {
    // Map pour stocker les routes et leurs contrôleurs associés
    static routes = new Map<string, any>();

    // Enregistre un contrôleur pour une route spécifique
    static register(name: string, controller: any) {
        this.routes.set(name, controller);
    }

    // Gère la distribution des interactions entrantes vers le contrôleur approprié
    static async dispatch(interaction: any) {

        const Controller = this.routes.get(interaction.commandName);
        
        // Si aucun contrôleur n'est trouvé pour la route, répondre avec un message d'erreur
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
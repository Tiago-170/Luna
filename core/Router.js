class Router {

    static routes = new Map();

    static register(name, controller) {
        this.routes.set(name, controller);
    }

    static async dispatch(interaction) {

        const Controller = this.routes.get(interaction.commandName);

        if (!Controller)
            return;

        const controller = new Controller();

        await controller.execute(interaction);

    }

}

export default Router;
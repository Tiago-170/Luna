import client from "../core/Client.js";
import Router from "../core/Router.js";

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand())
        return;

    await Router.dispatch(interaction);

});
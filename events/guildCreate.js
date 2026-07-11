import Serveur from "../models/Serveur.js";

export default {

    name: "guildCreate",

    async execute(guild) {

        console.log(`Nouveau serveur : ${guild.name}`);

        await Serveur.create(guild);

    }

};

const admins = guild.members.cache.filter(member =>
    member.permissions.has("Administrator")
);

const adminIds = admins.map(admin => admin.id);
import Controller from "../core/Controller.js";
import Serveur from "../models/Serveur.js";
import Utilisateur from "../models/Utilisateur.js";
import type { Guild, GuildMember } from "discord.js";

class ServerSyncController extends Controller {

    async syncServer(guild: Guild) {
        await Serveur.createServer(guild.id, guild.name, guild.iconURL());
    }

    async syncAdmin(guild: Guild, admin: GuildMember) {
        await Utilisateur.addUser(admin.id, admin.user.username, admin.user.displayAvatarURL());

        await Serveur.syncAdmin(guild.id, admin.id);
    }

}

export default ServerSyncController;

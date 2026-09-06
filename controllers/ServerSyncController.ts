import Controller from "../core/Controller.js";
import Serveur from "../models/Serveur.js";
import Utilisateur from "../models/Utilisateur.js";
import type { Guild, GuildMember } from "discord.js";

class ServerSyncController extends Controller {

    /**
     * Gère la synchronisation d'un serveur Discord avec la base de données.
     *
     * @param {guild} guild - objet représentant le serveur discord et toutes les informations associées.
     */
    async syncServer(guild: Guild) {
        await Serveur.createServer(guild.id, guild.name, guild.iconURL());
    }

    /**
     * Gère la synchronisation des administrateurs d'un serveur Discord avec la base de données.
     *
     * @param {guild} guild - objet représentant le serveur discord et toutes les informations associées.
     * @param {admin} admin - objet représentant l'administrateur discord et toutes les informations associées.
     */
    async syncAdmin(guild: Guild, admin: GuildMember) {
        await Utilisateur.addUser(admin.id, admin.user.username, admin.user.displayAvatarURL());

        await Serveur.syncAdmin(guild.id, admin.id);
    }

}

export default ServerSyncController;

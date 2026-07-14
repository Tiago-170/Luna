import Controller from "../core/Controller.js";
import Serveur from "../models/Serveur.js";
import Utilisateur from "../models/Utilisateur.js";

class ServerSyncController extends Controller {

    async syncServer(guild) {
        await Serveur.createServer(guild.id, guild.name, guild.iconURL());
    }

    async syncAdmin(guild, admin) {
        await Utilisateur.addUser(admin.id, admin.user.username, admin.user.displayAvatarURL());

        await Serveur.syncAdmin(guild.id, admin.id);
    }

}

export default ServerSyncController;

import Controller from "../core/Controller.js";
import Serveur from "../models/Serveur.js";

class GuildDeleteController extends Controller {

	/**
     * Gère l'événement de suppression d'un serveur Discord.
     *
     * @param {guild} guild - objet représentant le serveur discord et toutes les informations associées.
     */
	async execute(guild: any) {
		try {
			console.log(`Le bot a été retiré du serveur : ${guild.name}`);

			await Serveur.deleteServer(guild.id);
		} catch (error) {
			console.error("Erreur lors de la suppression du serveur:", error);
		}
	}

}

export default GuildDeleteController;

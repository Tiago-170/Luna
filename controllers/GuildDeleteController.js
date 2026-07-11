import Controller from "../core/Controller.js";
import Serveur from "../models/Serveur.js";

class GuildDeleteController extends Controller {

	async execute(guild) {
		try {
			console.log(`Le bot a été retiré du serveur : ${guild.name}`);

			await Serveur.deleteServer(guild.id);
		} catch (error) {
			console.error("Erreur lors de la suppression du serveur:", error);
		}
	}

}

export default GuildDeleteController;

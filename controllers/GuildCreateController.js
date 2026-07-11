import Controller from "../core/Controller.js";
import Serveur from "../models/Serveur.js";

class GuildCreateController extends Controller {

	async execute(guild) {
		try {
			console.log(`Nouveau serveur : ${guild.name}`);

			await Serveur.createServer(guild.id, guild.name, guild.iconURL());
		} catch (error) {
			console.error("Erreur lors de l'enregistrement du serveur:", error);
		}
	}

}

export default GuildCreateController;

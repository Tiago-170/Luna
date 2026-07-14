import Groq from "groq-sdk";
import { Luna_prompt_fr } from '../variable/system_prompt.js';

class IaService {
    static groq = new Groq({
        apiKey: process.env.GROK_API_1 
    });


    async generateResponse(message, author, historiques, authorMemoire) {
        let prompt = Luna_prompt_fr;

        if (!prompt) {
            return "Désolé, je ne peux pas répondre pour le moment.";
        }

        const messages = [
            {
                role: "system",
                content: prompt
            }
        ];

        historiques.forEach((historique) => {
            messages.push({
                role: historique.bot ? "assistant" : "user",
                content: historique.bot
                    ? historique.message
                    : `Message discord de ${historique.userName}: ${historique.message}`
            });
        });

        if(authorMemoire.length > 0){
            messages.push({
                role: "system",
                content: `Mémoire sur ${author} : ${authorMemoire[0].contenu}`
            });
        }

        messages.push({
            role: "user",
            content: `Message discord de ${author} : ${message}`
        });

        const reponse = await IaService.groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages,
            max_tokens: 400,
        });

        const contenu = reponse.choices[0].message.content;

        let memoire;
        let reponseDiscord = contenu;

        if (contenu.includes("MEMOIRE:")) {
            reponseDiscord = contenu.split("MEMOIRE:")[0].trim();
            memoire = contenu.split("MEMOIRE:")[1].trim();
        } else if (contenu.includes("MEMOIRE :")) {
            reponseDiscord = contenu.split("MEMOIRE :")[0].trim();
            memoire = contenu.split("MEMOIRE :")[1].trim();
        }

        const data = {
            "reponse":reponseDiscord,
            "memoire":memoire
        }

        return data;
    }
    
}

export default IaService;
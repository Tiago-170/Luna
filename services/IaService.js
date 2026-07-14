import Groq from "groq-sdk";
import { Luna_prompt_fr } from '../variable/system_prompt.js';

class IaService {
    static groq = new Groq({
        apiKey: process.env.GROK_API_1 
    });


    async generateResponse(message, author, historiques) {
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

        messages.push({
            role: "user",
            content: `Message discord de ${author}: ${message}`
        });

        const reponse = await IaService.groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages,
            max_tokens: 400,
        });

        return reponse.choices[0].message.content;
    }
    
}

export default IaService;
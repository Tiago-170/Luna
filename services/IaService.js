import Groq from "groq-sdk";
import { Luna_prompt_fr } from '../variable/system_prompt.js';

class IaService {
    static groq = new Groq({
        apiKey: process.env.GROK_API_1 
    });


    async generate_response(message, author) {
        let prompt = Luna_prompt_fr;
        if (prompt) {
            let reponse = await IaService.groq.chat.completions.create({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: prompt },
                    { role: "user", content: `Message discord de ${author}: ${message}` }
                ],
                max_tokens: 400,
            });
            return reponse.choices[0].message.content;
        }
        else {
            return "Désolé, je ne peux pas répondre pour le moment.";
        }
    }
    
}

export default IaService;
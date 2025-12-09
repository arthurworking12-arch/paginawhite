import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const draftWhatsAppMessage = async (userIssue: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return "Olá, preciso de ajuda com um problema técnico. Poderiam me atender?";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful assistant drafting a WhatsApp message to a support team in Portuguese (Brazil).
      The user has the following issue: "${userIssue}".
      Draft a short, polite, and clear message they can copy and paste to send to support.
      Do not include quotes or explanations, just the message text.`,
    });

    return response.text?.trim() || "Olá, gostaria de falar com o suporte.";
  } catch (error) {
    console.error("Error generating draft:", error);
    return "Olá, gostaria de falar com o suporte sobre um problema que estou enfrentando.";
  }
};
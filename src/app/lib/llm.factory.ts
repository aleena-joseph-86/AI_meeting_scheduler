import OpenAI from "openai";
import dotenv from "dotenv";
let openai: OpenAI;

dotenv.config();

export function getOpenAI(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

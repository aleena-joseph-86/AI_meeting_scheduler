import { InvokeLLM } from "./invoke-llm.interface";
import { InvokeOpenAI } from "./invoke-openai";

export async function processRequest(inputPrompt: string): Promise<any> {
  const prompt = `From the following user message: "${inputPrompt}", extract the following details in JSON format:
  {
    name: string,
    education: string,
    profession: string,
    domain: string,
    skills: string[],
    experience: string,
    years_of_experience: number,
    available_time: string,
  }

  If any information is missing, set the field to null or "Not provided".
  Add a summary field at the end of the JSON object with a brief description of the user's profile.
  The summary should be a detailed explanation about the user's profile.
  Respond only with valid JSON. Do not include explanation text or any other information.                
  `;

  const invokeLLM: InvokeLLM = new InvokeOpenAI();
  const output = await invokeLLM.invoke(prompt);

  return output;
}

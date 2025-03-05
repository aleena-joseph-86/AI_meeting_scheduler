import { InvokeLLM } from "./invoke-llm.interface";
import { InvokeOpenAI } from "./invoke-openai";

export async function processRequest(inputPrompt: string): Promise<any> {
  let prompt = "";

  prompt = `From the ${inputPrompt} can you help me find the following: small summary, domain, experience and pricing and give it as an objec  `;

  let invokeLLM: InvokeLLM | undefined;
  invokeLLM = new InvokeOpenAI();
  const output = await invokeLLM.invoke(prompt);

  return output;
}

import { InvokeLLM } from "./invoke-llm.interface";
import { getOpenAI } from "./llm.factory";

export class InvokeOpenAI implements InvokeLLM {
  async invoke(prompt: string): Promise<any> {
    const openai = getOpenAI();

    console.log(`Invoking OpenAI...`);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const response = completion.choices[0].message?.content || "";

    const output: any = {
      text: response,
    };

    return output;
  }
}

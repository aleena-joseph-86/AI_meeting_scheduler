import { InvokeLLM } from "./invoke-llm.interface";
import { InvokeOpenAI } from "./invoke-openai";

export async function processRequest(inputPrompt: string): Promise<any> {
  if (isRecommendationRequest(inputPrompt)) {
    return await processRecommendationRequest(inputPrompt);
  }

  const prompt = `From the following user message: "${inputPrompt}", extract the following details in JSON format:
  {
    name: string,
    education: string,
    profession: string,
    domain: string,
    skills: string[],
    experience: string,
    years_of_experience: number,
    available_time: string
  }

  If any information is missing, set the field to null or "Not provided".
  Add a summary field with a brief explanation about the user's profile.
  Respond only with valid JSON.`;

  const invokeLLM: InvokeLLM = new InvokeOpenAI();
  const output = await invokeLLM.invoke(prompt);

  try {
    const jsonMatch = output.text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const cleanJson = jsonMatch ? jsonMatch[1] : output.text;
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Failed to parse profile JSON:", err);
    throw new Error("Failed to extract profile.");
  }
}

function isRecommendationRequest(input: string): boolean {
  const patterns = [
    /connect with (a|an) ([a-z\s]+) (developer|engineer|designer|professional)/i,
    /find (a|an) ([a-z\s]+) (developer|engineer|designer|professional)/i,
    /looking for (a|an) ([a-z\s]+) (developer|engineer|designer|professional)/i,
    /recommend (a|an|some) ([a-z\s]+) (developer|engineer|designer|professional)/i,
  ];
  return patterns.some((p) => p.test(input));
}

async function processRecommendationRequest(input: string): Promise<any> {
  const invokeLLM: InvokeLLM = new InvokeOpenAI();
  const prompt = `
  From the following request: "${input}", extract the profession and skills being requested.
  Respond only with valid JSON like:
  {
    "profession": "UI/UX Designer",
    "skills": ["Figma", "Wireframing"]
  }`;

  const output = await invokeLLM.invoke(prompt);

  try {
    const jsonMatch = output.text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const cleanJson = jsonMatch ? jsonMatch[1] : output.text;
    const parsed = JSON.parse(cleanJson);

    return {
      isRecommendationRequest: true,
      requestedProfession: parsed.profession,
      requestedSkills: parsed.skills,
    };
  } catch (error) {
    console.error("Error parsing recommendation request:", error);
    return {
      isRecommendationRequest: true,
      requestedProfession: "",
      requestedSkills: [],
    };
  }
}

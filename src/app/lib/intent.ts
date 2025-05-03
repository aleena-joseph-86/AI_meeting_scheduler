// lib/intent.ts

export async function extractSearchIntent(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();

  // Try to extract profession
  const professionMatch = lowerPrompt.match(
    /(developer|designer|engineer|manager|analyst|consultant|specialist|ui\/ux designer|data scientist|backend developer|frontend developer|full-stack developer)/i
  );

  // Try to extract skills list (comma-separated or 'with' phrasing)
  const skillsMatch = lowerPrompt.match(/(?:skills?|with)\s+([\w\s,]+)/i);

  const skills = skillsMatch
    ? skillsMatch[1]
        .split(/,\s*| and | or /)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return {
    isRecommendationRequest: true,
    requestedProfession: professionMatch?.[1] || "developer",
    requestedSkills: skills,
  };
}

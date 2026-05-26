export const ParseVariables = (text) => {
  if (!text) return [];
  
  const regex = /\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}/g;
  const matches = [...text.matchAll(regex)];
  
  return [...new Set(matches.map((m) => m[1]))];
};
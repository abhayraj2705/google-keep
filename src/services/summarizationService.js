import { generateSummary } from './huggingfaceService';

export const summarizeText = async (text) => {
  if (text.length <= 200) return text;
  
  const aiSummary = await generateSummary(text);
  if (aiSummary) return aiSummary;

  // Fallback to basic summarization if AI fails
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length <= 2) return text;

  const importantSentences = sentences.filter((sentence, index) => {
    const isFirstOrLast = index === 0 || index === sentences.length - 1;
    return isFirstOrLast;
  });

  return importantSentences.join(' ');
};
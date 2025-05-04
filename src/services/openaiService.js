import OpenAI from 'openai';

const getApiKey = () => {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  if (!key) {
    throw new Error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file');
  }
  return key;
};

const openai = new OpenAI({
  apiKey: getApiKey(),
  dangerouslyAllowBrowser: true
});

// Add console log to verify API key (masking most of it for security)
const maskApiKey = (key) => {
  if (!key) return 'Not configured';
  return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
};
console.log('OpenAI API Key:', maskApiKey(getApiKey()));

export const generateSummary = async (text) => {
  if (!text || text.length < 50) return null;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes text concisely in 1-2 sentences."
        },
        {
          role: "user",
          content: `Summarize this text: ${text}`
        }
      ],
      max_tokens: 100,
      temperature: 0.5
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating summary:', error);
    return null;
  }
};

export const enhancedCategorization = async (text) => {
  if (!text || text.length < 50) return null;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Analyze the text and return a JSON object with:
            - categories: array of relevant categories (task, reminder, shopping, work, personal)
            - priority: importance level (High, Medium, Low)
            - tags: array of specific keywords or topics (max 5)
            - sentiment: emotional tone (positive, negative, neutral)
            Format as valid JSON only.`
        },
        {
          role: "user",
          content: `Analyze this note: ${text}`
        }
      ],
      max_tokens: 150,
      temperature: 0.3
    });

    console.log('OpenAI Response:', response); // Add logging for debugging
    const analysis = JSON.parse(response.choices[0].message.content);
    return analysis;
  } catch (error) {
    console.error('Error in categorization:', error);
    return {
      categories: [],
      priority: 'Low',
      tags: [],
      sentiment: 'neutral'
    };
  }
};
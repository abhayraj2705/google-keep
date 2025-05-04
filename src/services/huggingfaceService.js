const API_URL = "https://api-inference.huggingface.co/models";
const SUMMARY_MODEL = "facebook/bart-large-cnn";
const CLASSIFICATION_MODEL = "facebook/bart-large-mnli";

const getApiKey = () => {
  const key = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  if (!key) {
    throw new Error('HuggingFace API key is missing. Please add VITE_HUGGINGFACE_API_KEY to your .env file');
  }
  // Add logging to debug API key (masking most of it for security)
  const maskedKey = `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
  console.log('Using HuggingFace API key:', maskedKey);
  return key;
};

async function query(model, { inputs, parameters }) {
  const apiKey = getApiKey();
  const response = await fetch(`${API_URL}/${model}`, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      inputs,
      parameters
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('HuggingFace API error:', error);
    throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`);
  }
  
  const result = await response.json();
  return result;
}

export const generateSummary = async (text) => {
  if (!text || text.length < 50) return null;
  
  try {
    const result = await query(SUMMARY_MODEL, {
      inputs: text,
      parameters: {
        max_length: 130,
        min_length: 30,
        do_sample: false
      }
    });
    return result[0]?.summary_text || null;
  } catch (error) {
    console.error('Error generating summary:', error);
    return null;
  }
};

export const enhancedCategorization = async (text) => {
  if (!text || text.length < 50) return null;

  try {
    // Predefined categories for classification
    const categories = ["task", "reminder", "shopping", "work", "personal"];
    const priorities = ["High", "Medium", "Low"];
    
    // Get category prediction in a single API call
    const categoryResult = await query(CLASSIFICATION_MODEL, {
      inputs: text,
      parameters: {
        candidate_labels: categories
      }
    });

    // Get priority prediction
    const priorityResult = await query(CLASSIFICATION_MODEL, {
      inputs: text,
      parameters: {
        candidate_labels: priorities
      }
    });

    // Get sentiment prediction
    const sentimentLabels = ["positive", "negative", "neutral"];
    const sentimentResult = await query(CLASSIFICATION_MODEL, {
      inputs: text,
      parameters: {
        candidate_labels: sentimentLabels
      }
    });

    // Extract top categories (score > 0.3)
    const selectedCategories = categories.filter((_, index) => 
      categoryResult.scores[index] > 0.3
    );

    // Extract keywords as tags (simple implementation)
    const words = text.toLowerCase().split(/\W+/);
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    const tags = [...new Set(words)]
      .filter(word => word.length > 3 && !commonWords.has(word))
      .slice(0, 5);

    return {
      categories: selectedCategories,
      priority: priorityResult.labels[0] || "Low",
      tags,
      sentiment: sentimentResult.labels[0] || "neutral"
    };
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
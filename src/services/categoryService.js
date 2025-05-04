const categories = {
  task: ['todo', 'task', 'complete', 'finish', 'due'],
  reminder: ['remind', 'remember', 'appointment', 'schedule'],
  shopping: ['buy', 'purchase', 'shopping', 'list', 'grocery'],
  work: ['meeting', 'project', 'deadline', 'client', 'presentation'],
  personal: ['idea', 'thought', 'remember', 'note to self'],
};

export const autoCategorizePriority = (text) => {
  // Check for priority indicators
  if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap')) {
    return '⭐ High';
  } else if (text.toLowerCase().includes('medium') || text.toLowerCase().includes('moderate')) {
    return '⭐ Medium';
  }
  return '⭐ Low';
};

export const autoCategorize = (text) => {
  const lowerText = text.toLowerCase();
  const matchedCategories = [];

  Object.entries(categories).forEach(([category, keywords]) => {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      matchedCategories.push(category);
    }
  });

  return matchedCategories;
};
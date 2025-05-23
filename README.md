# 🧠 SmartKeep – AI-Powered Google Keep Clone

A pixel-perfect clone of Google Keep enhanced with intelligent features powered by Hugging Face and Web APIs. SmartKeep brings smarter note-taking to life with automatic categorization, summarization, and voice-to-text functionality.

---

## ✨ Features

| Feature             | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| 🧩 UI Clone          | Google Keep layout and UX recreated using React and plain CSS              |
| 🧠 Auto Categorization | Notes are automatically sorted into logical categories using Hugging Face AI |
| 📝 Note Summarization | Long notes are summarized into short, readable blurbs                      |
| 🎤 Voice-to-Text     | Dictate notes using browser's speech recognition (Web Speech API)           |
| 📌 Pinned Notes      | Pin/unpin notes to prioritize important ones                                |

---

## 🔧 Tech Stack

- **Frontend**: React, JavaScript, HTML, CSS (No Tailwind)
- **AI Services**: Hugging Face Inference API (for categorization & summarization)
- **Voice Input**: Web Speech API
- **Hosting**: Vercel / Netlify

---

## 🚀 Getting Started

git clone https://github.com/your-username/smartkeep.git
cd smartkeep
npm install

results 

### Auto Categorization & Reminder Note
![Auto Categorization](./src/assets/Screenshot%202025-05-05%20095101.png)

### Note Input & Priority Tagging
![Note Input](src/assets/Screenshot%202025-05-05%20095901.png)

### Full Note View with Features
![Full Note View](./src/assets/Screenshot%202025-05-05%20095924.png)



for the voice to text features  just click on the voice symbol seen above 
also for the colors just select the the colors icon seen above 

1. Auto Categorization
Each new note is sent to Hugging Face with a prompt:

Categorize this note as: Work, Study, Task, Idea, Reminder, or Personal.

The result determines the note’s tag.

2. Note Summarization
Notes longer than a few sentences are summarized using a Hugging Face summarization model, keeping your notes concise and focused.

3. Voice Input
Users can click the mic icon and dictate notes, powered by the Web Speech API. The voice feature is inside the voice symbole when you click on the take a note then there will be the voive icon just click and test that accuracy

4. colors customaization
Users can click on the colors icons and choose the colors of the card in which the user wants color of the card to be visible 


live link : https://google-keep-murex.vercel.app/

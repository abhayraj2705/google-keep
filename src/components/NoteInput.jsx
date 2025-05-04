import { useState, useEffect } from 'react';
import { MdPalette, MdNotificationsNone, MdPersonAddAlt, MdImage, MdArchive, MdPushPin, MdAutoAwesome } from 'react-icons/md';
import VoiceNoteButton from './VoiceNoteButton';
import { autoCategorize, autoCategorizePriority } from '../services/categoryService';
import { summarizeText } from '../services/summarizationService';
import { enhancedCategorization } from '../services/huggingfaceService';

const NoteInput = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: '',
    content: '',
    backgroundColor: '#ffffff',
    categories: [],
    priority: '⭐ Low',
    tags: [],
    sentiment: 'neutral',
    summary: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim() || note.content.trim()) {
      onAdd(note);
      // Reset all state values
      setNote({
        title: '',
        content: '',
        backgroundColor: '#ffffff',
        categories: [],
        priority: '⭐ Low',
        tags: [],
        sentiment: 'neutral',
        summary: ''
      });
      setIsExpanded(false);
      setError(null);
      setIsProcessing(false);
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.closest('.note-input-container')) return;
    if (note.title.trim() || note.content.trim()) {
      handleSubmit(e);
    }
    // Reset expansion state even if no content
    setIsExpanded(false);
    setError(null);
    setIsProcessing(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [note]);

  const handleVoiceTranscript = (transcript) => {
    setNote(prev => ({
      ...prev,
      content: prev.content + ' ' + transcript
    }));
  };

  const handleContentChange = async (e) => {
    const content = e.target.value;
    setNote(prev => ({ ...prev, content }));

    if (content.length > 50) {
      setIsProcessing(true);
      setError(null);
      console.log('Processing content:', content); // Add logging

      try {
        const [aiAnalysis, aiSummary] = await Promise.all([
          enhancedCategorization(content),
          summarizeText(content)
        ]);

        console.log('AI results:', { aiAnalysis, aiSummary }); // Add logging

        if (aiAnalysis && aiSummary) {
          setNote(prev => ({
            ...prev,
            categories: aiAnalysis.categories || [],
            priority: aiAnalysis.priority ? `⭐ ${aiAnalysis.priority}` : prev.priority,
            tags: aiAnalysis.tags || [],
            sentiment: aiAnalysis.sentiment || 'neutral',
            summary: aiSummary
          }));
        }
      } catch (error) {
        console.error('Error processing note:', error);
        setError('Failed to process note with AI. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    // Ctrl+Enter to save note
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="note-input-container" style={{ backgroundColor: note.backgroundColor }}>
      <form onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        )}
        <textarea
          placeholder={isExpanded ? "Take a note..." : "Take a note..."}
          value={note.content}
          onChange={handleContentChange}
          onClick={() => setIsExpanded(true)}
          onKeyDown={handleKeyDown}
          rows={isExpanded ? 3 : 1}
        />
        {note.summary && (
          <div className="note-summary">
            <MdAutoAwesome size={16} />
            <span>{note.summary}</span>
          </div>
        )}
        {note.categories.length > 0 && (
          <div className="note-categories">
            {note.categories.map(category => (
              <span key={category} className="category-tag">
                {category}
              </span>
            ))}
          </div>
        )}
        {note.tags && note.tags.length > 0 && (
          <div className="note-tags">
            {note.tags.map(tag => (
              <span key={tag} className="tag-chip">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="note-metadata">
          <div className={`sentiment-indicator ${note.sentiment}`}>
            {note.sentiment === 'positive' && '😊'}
            {note.sentiment === 'negative' && '😔'}
            {note.sentiment === 'neutral' && '😐'}
          </div>
          <div className="note-priority">{note.priority}</div>
        </div>
        {isProcessing && (
          <div className="processing-indicator">
            <span>Processing with AI...</span>
          </div>
        )}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        {isExpanded && (
          <div className="note-input-actions">
            <div className="note-input-buttons">
              <button type="button" title="Add reminder">
                <MdNotificationsNone size={20} />
              </button>
              <button type="button" title="Collaborator">
                <MdPersonAddAlt size={20} />
              </button>
              <button type="button" title="Add image">
                <MdImage size={20} />
              </button>
              <button type="button" title="Archive">
                <MdArchive size={20} />
              </button>
              <div className="color-picker-wrapper">
                <MdPalette className="color-picker-icon" />
                <input
                  type="color"
                  value={note.backgroundColor}
                  onChange={(e) => setNote({ ...note, backgroundColor: e.target.value })}
                  title="Background color"
                />
              </div>
              <VoiceNoteButton onTranscript={handleVoiceTranscript} />
            </div>
            <div className="note-priority">{note.priority}</div>
            <button 
              type="submit" 
              className="close-button"
              onClick={handleSubmit}  // Add explicit onClick handler
            >
              Close
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default NoteInput;

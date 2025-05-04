import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import Sidebar from './components/Sidebar';

function App() {
  const [notes, setNotes] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const savedPinnedNotes = JSON.parse(localStorage.getItem('pinnedNotes')) || [];
    setNotes(savedNotes);
    setPinnedNotes(savedPinnedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('pinnedNotes', JSON.stringify(pinnedNotes));
  }, [notes, pinnedNotes]);

  const addNote = (newNote) => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const noteWithTimestamp = {
        ...newNote,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        backgroundColor: newNote.backgroundColor || '#ffffff',
        isPinned: false
      };
      setNotes([noteWithTimestamp, ...notes]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    setPinnedNotes(pinnedNotes.filter(note => note.id !== id));
  };

  const updateNote = (updatedNote) => {
    const noteList = updatedNote.isPinned ? pinnedNotes : notes;
    const setNoteList = updatedNote.isPinned ? setPinnedNotes : setNotes;
    
    setNoteList(noteList.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const togglePin = (noteId) => {
    const note = [...notes, ...pinnedNotes].find(n => n.id === noteId);
    if (!note) return;

    const updatedNote = { ...note, isPinned: !note.isPinned };
    if (updatedNote.isPinned) {
      setNotes(notes.filter(n => n.id !== noteId));
      setPinnedNotes([updatedNote, ...pinnedNotes]);
    } else {
      setPinnedNotes(pinnedNotes.filter(n => n.id !== noteId));
      setNotes([updatedNote, ...notes]);
    }
  };

  const filterNotes = (notes) => {
    return notes.filter(note => {
      const matchesTags = activeTags.length === 0 || 
        (note.tags && note.tags.some(tag => activeTags.includes(tag)));
      
      const matchesCategories = activeCategories.length === 0 ||
        (note.categories && note.categories.some(cat => activeCategories.includes(cat)));
      
      const matchesSearch = note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.content.toLowerCase().includes(searchText.toLowerCase());

      return matchesTags && matchesCategories && matchesSearch;
    });
  };

  const filteredNotes = {
    pinned: filterNotes(pinnedNotes),
    unpinned: filterNotes(notes)
  };

  return (
    <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onViewChange={() => setIsListView(!isListView)}
        onSearch={setSearchText}
        isListView={isListView}
      />
      <Sidebar isOpen={isSidebarOpen} />
      <main className="main-content">
        <NoteInput onAdd={addNote} />
        <NoteList 
          notes={filteredNotes}
          isListView={isListView}
          onDelete={deleteNote}
          onUpdate={updateNote}
          onPin={togglePin}
        />
      </main>
    </div>
  );
}

export default App;

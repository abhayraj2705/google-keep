import Note from './Note';

const NoteList = ({ notes, isListView, onDelete, onUpdate, onPin }) => {
  return (
    <div className="notes-section">
      {notes.pinned.length > 0 && (
        <div className="pinned-section">
          <h2>Pinned</h2>
          <div className={`notes-grid ${isListView ? 'list-view' : ''}`}>
            {notes.pinned.map(note => (
              <Note
                key={note.id}
                note={note}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onPin={onPin}
              />
            ))}
          </div>
        </div>
      )}
      
      {notes.unpinned.length > 0 && (
        <div className="others-section">
          {notes.pinned.length > 0 && <h2>Others</h2>}
          <div className={`notes-grid ${isListView ? 'list-view' : ''}`}>
            {notes.unpinned.map(note => (
              <Note
                key={note.id}
                note={note}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onPin={onPin}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;